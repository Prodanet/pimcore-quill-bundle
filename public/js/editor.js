/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PCL
 */
class QuillCounter {
    constructor(quill, options) {
      this.quill = quill;
      this.options = options;
      this.container = document.querySelector(options.container);
      quill.on('text-change', this.update.bind(this));
      this.update();  // Account for initial contents
    }

    calculate() {
      let text = this.quill.getText();
      text = text.trim();
      if (this.options.unit === 'word') {
        // Splitting empty text returns a non-empty array
        return text.length > 0 ? text.split(/\s+/).length : 0;
      } else {
        return text.length;
      }
    }

    update() {
      var length = this.calculate();
      var label = this.options.unit ?? 'character';
      if (length > 1) {
        label += 's';
      }
        var message = length;
        if (this.options.maxChars > 0) {
            message = length + ' / ' + this.options.maxChars;
            if (length > this.options.maxChars) {
                this.container.style.color = 'red';
            }else {
                this.container.style.color = ''
            }
        } 
      this.container.innerText = message + ' ' + label;
    }
  }

pimcore.registerNS("pimcore.bundle.quill.editor");
pimcore.bundle.quill.editor = Class.create({
    maxChars: -1,
    activeEditor: null,
    quills: new Map(),

    initialize: function () {
        if(!parent.pimcore.wysiwyg) {
            parent.pimcore.wysiwyg = {};
            parent.pimcore.wysiwyg.editors = [];
        }
        parent.pimcore.wysiwyg.editors.push('quill');
        document.addEventListener(parent.pimcore.events.initializeWysiwyg, this.initializeWysiwyg.bind(this));
        document.addEventListener(parent.pimcore.events.createWysiwyg, this.createWysiwyg.bind(this));
        document.addEventListener(parent.pimcore.events.onDropWysiwyg, this.onDropWysiwyg.bind(this));
        document.addEventListener(parent.pimcore.events.beforeDestroyWysiwyg, this.beforeDestroyWysiwyg.bind(this));
    },

    initializeWysiwyg: function (e) {
        if (e.detail.context === 'object') {
            if (!isNaN(e.detail.config.maxCharacters) && e.detail.config.maxCharacters > 0) {
                this.maxChars = e.detail.config.maxCharacters;
            } else {
                this.maxChars = -1;
            }
        }

        this.config = e.detail.config;

        if(this.config.toolbarConfig) {
            const elementCustomConfig = JSON.parse(this.config.toolbarConfig);
            this.config = mergeObject(this.config, elementCustomConfig);
        }

        const Parchment = Quill.import('parchment');

        Quill.register({
            'modules/table-better': QuillTableBetter,
        }, true);

        const pimcoreIdAttributor = new Parchment.Attributor('pimcore_id', 'pimcore_id', {
            scope: Parchment.Scope.INLINE
        });
        Quill.register(pimcoreIdAttributor);

        const pimcoreTypeAttributor = new Parchment.Attributor('pimcore_type', 'pimcore_type', {
            scope: Parchment.Scope.INLINE
        });
        Quill.register(pimcoreTypeAttributor);

        const pimcoreThumbnailAttributor = new Parchment.Attributor('pimcore_disable_thumbnail', 'pimcore_disable_thumbnail', {
            scope: Parchment.Scope.INLINE
        });
        Quill.register(pimcoreThumbnailAttributor);

        const cssClassAttributor = new Parchment.Attributor('class', 'class', {
            scope: Parchment.Scope.ANY
        });
        Quill.register(cssClassAttributor, true);

        const cssIdAttributor = new Parchment.Attributor('id', 'id', {
            scope: Parchment.Scope.ANY
        });
        Quill.register(cssIdAttributor, true);

        const inlineCssAttributor = new Parchment.Attributor('style', 'style', {
            scope: Parchment.Scope.ANY
        });
        Quill.register(inlineCssAttributor, true);

        this.createHtmlEditModal();
    },

    createWysiwyg: function (e) {
        const textareaId = e.detail.textarea.id ?? e.detail.textarea;
        document.getElementById(textareaId).removeAttribute('contenteditable');
        const counterContainerId = '#' + textareaId + '-counter';

        let subSpace = '';
        if (e.detail.context === 'document') {
            subSpace = 'editables';
        } else if (e.detail.context === 'object') {
            subSpace = 'tags';
        }

        let defaultConfig = {};
        if('' !== subSpace && pimcore[e.detail.context][subSpace]) {
            defaultConfig = pimcore[e.detail.context][subSpace].wysiwyg ? pimcore[e.detail.context][subSpace].wysiwyg.defaultEditorConfig : {};
        }

        const finalConfig = Object.assign({}, {
            theme: 'snow',
            modules: { 
                counter: {
                    enabled: false
                }
            },
            Singleline: false,
        }, defaultConfig, this.config);

        //Workaround: https://github.com/attoae/quill-table-better/issues/12#issuecomment-2347920271
        const textareaElement = document.getElementById(textareaId);
        if (finalConfig.modules && finalConfig.modules.counter && finalConfig.modules.counter.enabled) {
            Quill.register('modules/counter', QuillCounter);
            const textAreaParent = textareaElement.parentNode;
            const counterContainer = document.createElement('div');
            counterContainer.setAttribute('id', textareaId + '-counter');
            counterContainer.className = 'x-panel-footer quill-counter';
            textAreaParent.appendChild(counterContainer);
            textareaElement.classList.add('ql-container-pdm');
            finalConfig.modules.counter.container = counterContainerId;
            finalConfig.modules.counter.maxChars = this.maxChars;
        }

        document.dispatchEvent(new CustomEvent(pimcore.events.createWysiwygConfig, {
            detail: {
                data: finalConfig,
                context: e.detail.context
            }
        }));

        this.setDefaultConfig(finalConfig);

        const html = textareaElement.innerHTML;
        textareaElement.innerHTML = '';

        this.activeEditor = new Quill(`#${textareaId}`, finalConfig);
        if (finalConfig.hasOwnProperty('Singleline') && finalConfig.Singleline) {
            const enterHander = () => {
                return false;
            };
            if (this.activeEditor.keyboard.hasOwnProperty('bindings')) {
                if (this.activeEditor.keyboard.bindings.hasOwnProperty('Enter')) {
                    this.activeEditor.keyboard.bindings.Enter = [];
                }
            }
            this.activeEditor.keyboard.addBinding({ key: 'Enter' }, enterHander);
            this.activeEditor.keyboard.addBinding({ key: 'Enter', shortKey: true }, enterHander);
        }
        this.quills.set(textareaId, this.activeEditor);

        this.setEditorContent(html);

        this.initializeToolbar();

        this.activeEditor.on('text-change', () => {
            const tableModule = this.activeEditor.getModule('table-better');
            tableModule?.deleteTableTemporary();
            document.dispatchEvent(new CustomEvent(pimcore.events.changeWysiwyg, {
                detail: {
                    e: {target:{id: textareaId}},
                    data: this.activeEditor.getSemanticHTML(),
                    context: e.detail.context
                }
            }));
            checkCharCount();
        });

        this.activeEditor.container.firstChild.onfocus = () => {
            this.activeEditor = this.quills.get(textareaId);
        };

        this.activeEditor.container.firstChild.onblur = () => {
        };

        const maxChars = this.maxChars;
        const checkCharCount = () => {
            this.activeEditor.root.style.border = '';
            this.activeEditor.root.setAttribute('title', '');

            const charCount = this.activeEditor.getLength();

            if (maxChars !== -1 && charCount > maxChars) {
                this.activeEditor.root.style.border = '1px solid red';
                this.activeEditor.root.setAttribute('title', t('maximum_length_is') + ' ' + maxChars);
            }
        };
        checkCharCount();
    },

    onDropWysiwyg: function (e) {
        this.activeEditor = this.quills.get(e.detail.textareaId);
        this.showOnlyActiveToolbar();

        let data = e.detail.data;

        const record = data.records[0];
        data = record.data;

        let textIsSelected = false;

        let retval = this.activeEditor.getSelection();
        if (!retval) {
            this.activeEditor.setSelection(0);
            retval = this.activeEditor.getSelection();
        }

        if (retval.length > 0) {
            textIsSelected = true;
        }

        const id = data.id;
        let uri = data.path;
        const browserPossibleExtensions = ["jpg", "jpeg", "gif", "png"];

        if (data.elementType === "asset") {
            if (data.type === "image" && textIsSelected === false) {
                if(this.activeEditor.options.formats && !this.activeEditor.options.formats.includes('image')) {
                    return;
                }

                // images bigger than 600px or formats which cannot be displayed by the browser directly will be
                // converted by the pimcore thumbnailing service so that they can be displayed in the editor
                let defaultWidth = 600;
                const additionalAttributes = {
                    width: `${defaultWidth}px`,
                    alt: 'asset_image',
                    pimcore_id: id,
                    pimcore_type: 'asset'
                };

                if (typeof data.imageWidth != "undefined") {
                    const route = 'pimcore_admin_asset_getimagethumbnail';
                    const params = {
                        id: id,
                        width: defaultWidth,
                        aspectratio: true
                    };

                    uri = Routing.generate(route, params);

                    if (data.imageWidth < defaultWidth
                      && in_arrayi(pimcore.helpers.getFileExtension(data.text),
                        browserPossibleExtensions)) {
                        uri = data.path;
                        additionalAttributes.pimcore_disable_thumbnail = true;
                    }

                    if (data.imageWidth < defaultWidth) {
                        additionalAttributes.defaultWidth = data.imageWidth;
                    }

                }

                this.activeEditor.insertEmbed(retval.index, 'image', uri, 'user');
                this.activeEditor.formatText(retval.index, 1, additionalAttributes);

                return true;
            } else {
                this.activeEditor.format('link', uri);
                this.activeEditor.format('pimcore_id', id);
                this.activeEditor.format('pimcore_type', 'asset');
                return true;
            }
        }

        this.activeEditor.format('link', uri);
        this.activeEditor.format('pimcore_id', id);
        if (data.elementType === "document" && (data.type === "page"
          || data.type === "hardlink" || data.type === "link")) {
            this.activeEditor.format('pimcore_type', 'document');
            return true;
        }

        if (data.elementType === "object") {
            this.activeEditor.format('pimcore_type', 'object');
            return true;
        }
    },

    beforeDestroyWysiwyg: function (e) {

    },

    setDefaultConfig: function (config) {
        const modules = config.modules
        if (!modules.hasOwnProperty('table')) {
            modules.table = false;
        }

        if (!modules.hasOwnProperty('table-better')) {
            modules['table-better'] = {
                language: 'en_US',
                menus: ['column', 'row', 'merge', 'table', 'cell', 'wrap', 'delete'],
                toolbarTable: true
            };
        }

        if(!modules.hasOwnProperty('keyboard')) {
            modules.keyboard = {
                bindings: QuillTableBetter.keyboardBindings
            };
        }

        if (config.hasOwnProperty('Singleline') && config.Singleline) {
            modules.toolbar = {
                container: [
                    ['undo', 'redo'],
                    ['bold', 'underline'],
                    ['clean']
                ]
            };
        } else if(!config.hasOwnProperty('Singleline') || config.hasOwnProperty('Singleline') && !config.Singleline) {
            modules.toolbar = {
                container: [
                    ['undo', 'redo'],
                    ['bold', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            };
        }

        if(!modules.hasOwnProperty('toolbar')) {
            modules.toolbar = {
                container: [
                    ['undo', 'redo'],
                    ['bold', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            };
        }

        if(!modules.hasOwnProperty('history')) {
            modules.history = {
                delay: 700,
                maxStack: 200,
                userOnly: true
            };
        }

        return config;
    },

    initializeToolbar: function () {
        this.createToolbarBtn(
            'undo',
            () => {this.activeEditor.history.undo()},
        );
        this.createToolbarBtn(
            'redo',
            () => {this.activeEditor.history.redo()},
        );
        this.createToolbarBtn(
            'html-edit',
            this.openHtmlEdit.bind(this)
        );

    },

    createToolbarBtn: function (className, onClick, innerHTML = '') {
        const toolbarBtns = document.getElementsByClassName('ql-' + className);
        if (!toolbarBtns) {
            return;
        }
        for (let toolbarBtn of toolbarBtns) {
            toolbarBtn.innerHTML = innerHTML;
            toolbarBtn.onclick = function (e) {
                e.preventDefault();
                onClick(e);
            };
        }
    },

    createHtmlEditModal: function() {
        const rootNode = document.body;

        this.modalBackground = document.createElement('div');
        this.modalBackground.setAttribute('class', 'modal__bg');

        const modal = document.createElement('div');
        modal.setAttribute('class', 'modal__inner');

        const contentNode = document.createElement("div");

        const [header, closeBtn] = this.createModalHeader(this.modalBackground, t('HTML Edit'));
        contentNode.appendChild(header);
        contentNode.appendChild(closeBtn);

        const textarea = document.createElement('textarea');
        textarea.setAttribute('class', 'modal__inner-textarea');
        contentNode.appendChild(textarea);

        modal.appendChild(contentNode);
        this.modalBackground.appendChild(modal);
        rootNode.appendChild(this.modalBackground);

        document.addEventListener('click', (event) => {
              if (event.target === this.modalBackground) {
                  this.modalBackground.style.display = "none";
              }
        });

        contentNode.appendChild(
          this.createActionButtons(
            this.modalBackground,
            () => {
                const html = this.modalBackground.getElementsByTagName('textarea')[0].value;
                this.setEditorContent(html);
            }
          )
        );

        return this.modalBackground;
    },

    createModalHeader: function (modal, text)  {
        const header = document.createElement("span");
        header.innerHTML = text;

        const closeBtn = document.createElement("button");
        closeBtn.setAttribute('class', 'modal__close-btn');
        closeBtn.onclick = () => modal.style.display = "none";

        return [header, closeBtn];
    },

    createActionButtons: function (modal, onClickSave) {
        const container = document.createElement("div");
        container.setAttribute('class', 'modal__container-actions');
        const cancelBtn = document.createElement("button");
        cancelBtn.setAttribute('class', 'actions__cancel-btn');
        cancelBtn.innerHTML = t('cancel');
        cancelBtn.onclick = () => modal.style.display = "none";
        const saveBtn = document.createElement("button");
        saveBtn.setAttribute('class', 'actions__save-btn');
        saveBtn.innerHTML = t('save');
        saveBtn.onclick = () => {
            onClickSave();
            modal.style.display = "none"
        }
        container.appendChild(cancelBtn);
        container.appendChild(saveBtn);
        return container;
    },

    openHtmlEdit: function() {
        this.modalBackground.style.display = "block";
        const textarea = this.modalBackground.getElementsByTagName('textarea')[0];
        const tableModule = this.activeEditor.getModule('table-better');
        tableModule?.deleteTableTemporary();
        textarea.value = this.activeEditor.getSemanticHTML();
    },

    setEditorContent: function (html) {
        this.activeEditor.deleteText(0, this.activeEditor.getLength());
        const delta = this.activeEditor.clipboard.convert({
            html,
            text: '\n'
        });
        this.activeEditor.updateContents(delta, Quill.sources.USER);
        this.activeEditor.history.clear();
    }
})

new pimcore.bundle.quill.editor();
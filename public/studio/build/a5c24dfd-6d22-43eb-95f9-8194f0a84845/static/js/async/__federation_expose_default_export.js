"use strict";
(self["webpackChunkpimcore_quill_bundle"] = self["webpackChunkpimcore_quill_bundle"] || []).push([["__federation_expose_default_export"], {
"./js/src/modules/quill-editor/editor.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/quill/quill.js");
/* ESM import */var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/quill/dist/quill.core.css");
/* ESM import */var quill_dist_quill_bubble_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/quill/dist/quill.bubble.css");
/* ESM import */var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/quill/dist/quill.snow.css");
/* ESM import */var quill_table_better__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./node_modules/quill-table-better/dist/quill-table-better.js");
/* ESM import */var quill_table_better__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(quill_table_better__WEBPACK_IMPORTED_MODULE_6__);
/* ESM import */var quill_table_better_dist_quill_table_better_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./node_modules/quill-table-better/dist/quill-table-better.css");
/* ESM import */var _html_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./js/src/modules/quill-editor/html-modal.tsx");
/* ESM import */var _pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("webpack/container/remote/@pimcore/studio-ui-bundle/components");
/* ESM import */var _pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_9__);
/* ESM import */var _pimcore_studio_ui_bundle_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("webpack/container/remote/@pimcore/studio-ui-bundle/utils");
/* ESM import */var _pimcore_studio_ui_bundle_utils__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_pimcore_studio_ui_bundle_utils__WEBPACK_IMPORTED_MODULE_10__);
/* ESM import */var _pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("webpack/container/remote/@pimcore/studio-ui-bundle/app");
/* ESM import */var _pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_11__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();











const Editor = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s((param, ref)=>{
    let { defaultValue = '', onSelectionChange, onTextChange, maxCharacters, editorConfig, placeholder = '', readOnly = false } = param;
    _s();
    const { t } = (0,_pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_11__.useTranslation)();
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const onTextChangeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(onTextChange);
    const onSelectionChangeRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(onSelectionChange);
    const [editor, setEditor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [openHtmlModal, setOpenHtmlModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [html, setHtml] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const [lastSelection, setLastSelection] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>({
            onDrop: (info)=>{
                if (editor !== undefined) {
                    onDropWysiwyg(editor, info);
                }
            }
        }));
    initQuill();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(()=>{
        onTextChangeRef.current = onTextChange;
        onSelectionChangeRef.current = onSelectionChange;
    });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const container = containerRef.current;
        const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));
        const finalConfig = Object.assign({
            theme: 'snow',
            modules: {}
        }, editorConfig);
        setDefaultConfig(finalConfig);
        const quill = new quill__WEBPACK_IMPORTED_MODULE_2__["default"](editorContainer, finalConfig);
        editorContainer.getElementsByClassName('ql-editor')[0].setAttribute('data-placeholder', placeholder);
        quill.enable(!readOnly);
        setEditor(quill);
        initializeToolbar(quill);
        setEditorContent(quill, defaultValue);
        quill.on(quill__WEBPACK_IMPORTED_MODULE_2__["default"].events.TEXT_CHANGE, function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            var _onTextChangeRef_current;
            const tableModule = quill.getModule('table-better');
            tableModule === null || tableModule === void 0 ? void 0 : tableModule.deleteTableTemporary();
            (_onTextChangeRef_current = onTextChangeRef.current) === null || _onTextChangeRef_current === void 0 ? void 0 : _onTextChangeRef_current.call(onTextChangeRef, quill.getSemanticHTML());
            checkCharCount(quill);
        });
        quill.on(quill__WEBPACK_IMPORTED_MODULE_2__["default"].events.SELECTION_CHANGE, function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            var _onSelectionChangeRef_current;
            (_onSelectionChangeRef_current = onSelectionChangeRef.current) === null || _onSelectionChangeRef_current === void 0 ? void 0 : _onSelectionChangeRef_current.call(onSelectionChangeRef, ...args);
            setLastSelection(args[0] ?? args[1]);
        });
        return ()=>{
            setEditor(undefined);
            container.innerHTML = '';
        };
    }, [
        containerRef
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (editor === undefined) {
            return;
        }
        const tableModule = editor.getModule('table-better');
        tableModule === null || tableModule === void 0 ? void 0 : tableModule.deleteTableTemporary();
        if (defaultValue !== '<p></p>' && defaultValue !== editor.getSemanticHTML()) {
            setEditorContent(editor, defaultValue);
        }
    }, [
        defaultValue
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                ref: containerRef
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/quill-bundle/assets/studio/js/src/modules/quill-editor/editor.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_html_modal__WEBPACK_IMPORTED_MODULE_8__.HtmlModal, {
                html: html,
                open: openHtmlModal,
                save: (code)=>{
                    if (editor !== undefined) {
                        setEditorContent(editor, code);
                    }
                },
                setOpen: setOpenHtmlModal
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/quill-bundle/assets/studio/js/src/modules/quill-editor/editor.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
    function initQuill() {
        quill__WEBPACK_IMPORTED_MODULE_2__["default"].register({
            'modules/table-better': (quill_table_better__WEBPACK_IMPORTED_MODULE_6___default())
        }, true);
        const Parchment = quill__WEBPACK_IMPORTED_MODULE_2__["default"]["import"]('parchment');
        quill__WEBPACK_IMPORTED_MODULE_2__["default"].register({
            'modules/table-better': (quill_table_better__WEBPACK_IMPORTED_MODULE_6___default())
        }, true);
        const pimcoreIdAttributor = new Parchment.Attributor('pimcore_id', 'pimcore_id', {
            scope: Parchment.Scope.INLINE
        });
        quill__WEBPACK_IMPORTED_MODULE_2__["default"].register(pimcoreIdAttributor);
        const pimcoreTypeAttributor = new Parchment.Attributor('pimcore_type', 'pimcore_type', {
            scope: Parchment.Scope.INLINE
        });
        quill__WEBPACK_IMPORTED_MODULE_2__["default"].register(pimcoreTypeAttributor);
        const pimcoreThumbnailAttributor = new Parchment.Attributor('pimcore_disable_thumbnail', 'pimcore_disable_thumbnail', {
            scope: Parchment.Scope.INLINE
        });
        quill__WEBPACK_IMPORTED_MODULE_2__["default"].register(pimcoreThumbnailAttributor);
        const cssClassAttributor = new Parchment.Attributor('class', 'class', {
            scope: Parchment.Scope.ANY
        });
        quill__WEBPACK_IMPORTED_MODULE_2__["default"].register(cssClassAttributor, true);
        const cssIdAttributor = new Parchment.Attributor('id', 'id', {
            scope: Parchment.Scope.ANY
        });
        quill__WEBPACK_IMPORTED_MODULE_2__["default"].register(cssIdAttributor, true);
        const inlineCssAttributor = new Parchment.Attributor('style', 'style', {
            scope: Parchment.Scope.ANY
        });
        quill__WEBPACK_IMPORTED_MODULE_2__["default"].register(inlineCssAttributor, true);
    }
    function initializeToolbar(quill) {
        createToolbarBtn('undo', ()=>{
            quill.history.undo();
        });
        createToolbarBtn('redo', ()=>{
            quill.history.redo();
        });
        createToolbarBtn('html-edit', ()=>{
            const tableModule = quill.getModule('table-better');
            tableModule === null || tableModule === void 0 ? void 0 : tableModule.deleteTableTemporary();
            setHtml(quill.getSemanticHTML());
            setOpenHtmlModal(true);
        });
    }
    function setEditorContent(quill, html) {
        quill.deleteText(0, quill.getLength());
        const delta = quill.clipboard.convert({
            html,
            text: '\n'
        });
        quill.updateContents(delta, quill__WEBPACK_IMPORTED_MODULE_2__["default"].sources.USER);
        quill.history.clear();
        checkCharCount(quill);
    }
    function createToolbarBtn(className, onClick) {
        let innerHTML = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : '';
        const toolbarBtns = document.getElementsByClassName('ql-' + className);
        if (toolbarBtns.length === 0) {
            return;
        }
        for (const toolbarBtn of toolbarBtns){
            toolbarBtn.innerHTML = innerHTML;
            toolbarBtn.addEventListener('click', function(e) {
                e.preventDefault();
                onClick(e);
            });
        }
    }
    function checkCharCount(quill) {
        quill.root.style.border = '';
        quill.root.setAttribute('title', '');
        const charCount = quill.getLength();
        if (typeof maxCharacters === 'number' && maxCharacters !== 0 && charCount > maxCharacters) {
            quill.root.style.border = '1px solid red';
            quill.root.setAttribute('title', t('maximum_length_is') + ' ' + maxCharacters);
        }
    }
    function setDefaultConfig(config) {
        const modules = config.modules;
        if (modules.table === undefined) {
            modules.table = false;
        }
        if (modules['table-better'] === undefined) {
            modules['table-better'] = {
                language: 'en_US',
                menus: [
                    'column',
                    'row',
                    'merge',
                    'table',
                    'cell',
                    'wrap',
                    'delete'
                ],
                toolbarTable: true
            };
        }
        if (modules.keyboard === undefined) {
            modules.keyboard = {
                bindings: (quill_table_better__WEBPACK_IMPORTED_MODULE_6___default().keyboardBindings)
            };
        }
        if (modules.toolbar === undefined) {
            modules.toolbar = {
                container: [
                    [
                        'undo',
                        'redo'
                    ],
                    [
                        {
                            header: [
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                false
                            ]
                        }
                    ],
                    [
                        'bold',
                        'italic'
                    ],
                    [
                        {
                            align: []
                        }
                    ],
                    [
                        {
                            list: 'ordered'
                        },
                        {
                            list: 'bullet'
                        }
                    ],
                    [
                        {
                            indent: '-1'
                        },
                        {
                            indent: '+1'
                        }
                    ],
                    [
                        'blockquote'
                    ],
                    [
                        'link',
                        'table-better'
                    ],
                    [
                        'clean',
                        'html-edit'
                    ]
                ]
            };
        }
        if (modules.history === undefined) {
            modules.history = {
                delay: 700,
                maxStack: 200,
                userOnly: true
            };
        }
        return config;
    }
    function onDropWysiwyg(quill, info) {
        const data = info.data;
        let textIsSelected = false;
        let retval = lastSelection;
        if (retval === undefined) {
            retval = new quill__WEBPACK_IMPORTED_MODULE_2__.Range(0, 0);
        }
        if (retval.length > 0) {
            textIsSelected = true;
        }
        const id = data.id;
        let uri = data.fullPath;
        const browserPossibleExtensions = [
            'jpg',
            'jpeg',
            'gif',
            'png'
        ];
        if (info.type === 'asset') {
            if (data.type === 'image' && !textIsSelected) {
                // images bigger than 600px or formats which cannot be displayed by the browser directly will be
                // converted by the pimcore thumbnailing service so that they can be displayed in the editor
                const defaultWidth = 600;
                const additionalAttributes = {
                    width: `${defaultWidth}px`,
                    alt: 'asset_image',
                    pimcore_id: id,
                    pimcore_type: 'asset'
                };
                if (typeof data.width !== 'undefined') {
                    uri = (0,_pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_9__.createImageThumbnailUrl)(id, {
                        width: defaultWidth,
                        mimeType: 'JPEG'
                    });
                    if (data.width < defaultWidth && browserPossibleExtensions.includes(getFileExtension(data.fullPath))) {
                        uri = data.fullPath;
                        additionalAttributes.pimcore_disable_thumbnail = true;
                    }
                    if (data.width < defaultWidth) {
                        additionalAttributes.width = (0,_pimcore_studio_ui_bundle_utils__WEBPACK_IMPORTED_MODULE_10__.toCssDimension)(data.width);
                    }
                }
                quill.insertEmbed(retval.index, 'image', uri, 'user');
                quill.formatText(retval.index, 1, additionalAttributes);
                return;
            } else {
                quill.format('link', uri);
                quill.format('pimcore_id', id);
                quill.format('pimcore_type', 'asset');
                return;
            }
        }
        quill.format('link', uri);
        quill.format('pimcore_id', id);
        if (data.elementType === 'document' && (data.type === 'page' || data.type === 'hardlink' || data.type === 'link')) {
            quill.format('pimcore_type', 'document');
            return;
        }
        if (data.elementType === 'object') {
            quill.format('pimcore_type', 'object');
        }
    }
    function getFileExtension(filename) {
        const extensionP = filename.split('.');
        return extensionP[extensionP.length - 1];
    }
}, "zKEuC9G8YXPyE9m3iDjfxl4SP+s=", false, function() {
    return [
        _pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_11__.useTranslation
    ];
})), "zKEuC9G8YXPyE9m3iDjfxl4SP+s=", false, function() {
    return [
        _pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_11__.useTranslation
    ];
});
_c1 = Editor;
Editor.displayName = 'Editor';
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);
var _c, _c1;
$RefreshReg$(_c, "Editor$forwardRef");
$RefreshReg$(_c1, "Editor");

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/modules/quill-editor/html-modal.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  HtmlModal: () => (HtmlModal)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/container/remote/@pimcore/studio-ui-bundle/components");
/* ESM import */var _pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("webpack/container/remote/@pimcore/studio-ui-bundle/app");
/* ESM import */var _pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();



const HtmlModal = (param)=>{
    let { open, setOpen, html, save } = param;
    _s();
    const { t } = (0,_pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_3__.useTranslation)();
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(html);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setValue(html);
    }, [
        html
    ]);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_1__.ModalFooter, {
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                    danger: true,
                    onClick: ()=>{
                        setOpen(false);
                    },
                    children: t('cancel')
                }, "cancel", false, {
                    fileName: "/var/www/html/dev/pimcore/quill-bundle/assets/studio/js/src/modules/quill-editor/html-modal.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, void 0),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                    onClick: ()=>{
                        save(value);
                        setOpen(false);
                    },
                    type: 'primary',
                    children: t('save')
                }, "save", false, {
                    fileName: "/var/www/html/dev/pimcore/quill-bundle/assets/studio/js/src/modules/quill-editor/html-modal.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "/var/www/html/dev/pimcore/quill-bundle/assets/studio/js/src/modules/quill-editor/html-modal.tsx",
            lineNumber: 23,
            columnNumber: 16
        }, void 0),
        onCancel: ()=>{
            setOpen(false);
        },
        open: open,
        size: "XL",
        title: 'HTML',
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_pimcore_studio_ui_bundle_components__WEBPACK_IMPORTED_MODULE_1__.TextArea, {
                autoSize: {
                    minRows: 4
                },
                onChange: (e)=>{
                    setValue(e.target.value);
                },
                value: value
            }, void 0, false, {
                fileName: "/var/www/html/dev/pimcore/quill-bundle/assets/studio/js/src/modules/quill-editor/html-modal.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, undefined)
        }, void 0, false)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/quill-bundle/assets/studio/js/src/modules/quill-editor/html-modal.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, undefined);
};
_s(HtmlModal, "U/n7oPVqwe2G6P8Yal8iDc83LJ4=", false, function() {
    return [
        _pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_3__.useTranslation
    ];
});
_c = HtmlModal;
var _c;
$RefreshReg$(_c, "HtmlModal");

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/modules/quill-editor/index.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  QuillEditorModule: () => (QuillEditorModule)
});
/* ESM import */var _pimcore_studio_ui_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("webpack/container/remote/@pimcore/studio-ui-bundle");
/* ESM import */var _pimcore_studio_ui_bundle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pimcore_studio_ui_bundle__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/container/remote/@pimcore/studio-ui-bundle/app");
/* ESM import */var _pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _pimcore_studio_ui_bundle_modules_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/container/remote/@pimcore/studio-ui-bundle/modules/app");
/* ESM import */var _pimcore_studio_ui_bundle_modules_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_pimcore_studio_ui_bundle_modules_app__WEBPACK_IMPORTED_MODULE_2__);
/* ESM import */var _quill_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./js/src/modules/quill-editor/quill-editor.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");




const QuillEditorModule = {
    onInit: ()=>{
        const componentRegistry = _pimcore_studio_ui_bundle__WEBPACK_IMPORTED_MODULE_0__.container.get(_pimcore_studio_ui_bundle_app__WEBPACK_IMPORTED_MODULE_1__.serviceIds["App/ComponentRegistry/ComponentRegistry"]);
        componentRegistry.override({
            component: _quill_editor__WEBPACK_IMPORTED_MODULE_3__["default"],
            name: _pimcore_studio_ui_bundle_modules_app__WEBPACK_IMPORTED_MODULE_2__.componentConfig.wysiwyg.editor.name
        });
    }
};

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/modules/quill-editor/quill-editor.styles.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useStyles: () => (useStyles)
});
/* ESM import */var antd_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/antd-style/es/functions/index.js");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* This source file is available under the terms of the
* Pimcore Open Core License (POCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.com)
*  @license    Pimcore Open Core License (POCL)
*/ 
const useStyles = (0,antd_style__WEBPACK_IMPORTED_MODULE_0__.createStyles)((param)=>{
    let { css, token } = param;
    return {
        editor: css`
      overflow: auto;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadius}px;
      min-height: 100px;
      min-width: 200px;
      background-color: ${token.colorBgContainer};
      cursor: text;

      div[contenteditable='false'] {
        background-color: ${token.colorBgContainerDisabled};
        cursor: not-allowed;
      }
      
      .ql-toolbar {
        border: none;
        border-bottom: 1px solid ${token.colorBorder};
      }
      
      .ql-container {
        border: none;
      }

      .ql-toolbar .ql-formats :is(button.ql-undo,button.ql-redo,  button.ql-html-edit) {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 18px;
      }
      
      .ql-toolbar .ql-undo {
        background-image: url(/bundles/pimcorequill/css/icons/arrow-counterclockwise.svg);
      }

      .ql-toolbar .ql-redo {
        background-image: url(/bundles/pimcorequill/css/icons/arrow-clockwise.svg);
      }

      .ql-toolbar .ql-html-edit {
        background-image: url(/bundles/pimcorequill/css/icons/code.svg);
      }

      .ql-operate-block + .ql-table-properties-form {
        z-index: 9999;
      }
    `
    };
});

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/modules/quill-editor/quill-editor.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  QuillEditor: () => (QuillEditor),
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("webpack/sharing/consume/default/react/react");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* ESM import */var _quill_editor_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./js/src/modules/quill-editor/quill-editor.styles.tsx");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* ESM import */var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* ESM import */var _editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./js/src/modules/quill-editor/editor.tsx");
/* ESM import */var _pimcore_studio_ui_bundle_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("webpack/container/remote/@pimcore/studio-ui-bundle/utils");
/* ESM import */var _pimcore_studio_ui_bundle_utils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_pimcore_studio_ui_bundle_utils__WEBPACK_IMPORTED_MODULE_5__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");
/**
* This source file is available under the terms of the
* Pimcore Open Core License (POCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.com)
*  @license    Pimcore Open Core License (POCL)
*/ 
var _s = $RefreshSig$();





const QuillEditor = /*#__PURE__*/ _s((0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(_c = _s((param, ref)=>{
    let { value, onChange, disabled, width, height, maxCharacters, placeholder, editorConfig } = param;
    _s();
    const editorRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { styles } = (0,_quill_editor_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles)();
    const timeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(setTimeout(()=>{}));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, ()=>({
            onDrop: (info)=>{
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_3__.isNull)(editorRef.current)) {
                    editorRef.current.onDrop(info);
                }
            }
        }));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        return ()=>{
            clearTimeout(timeoutRef.current);
        };
    }, []);
    const handleInput = (editorHtml)=>{
        startTimeout(editorHtml);
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: styles.editor,
        style: {
            maxWidth: (0,_pimcore_studio_ui_bundle_utils__WEBPACK_IMPORTED_MODULE_5__.toCssDimension)(width),
            maxHeight: (0,_pimcore_studio_ui_bundle_utils__WEBPACK_IMPORTED_MODULE_5__.toCssDimension)(height)
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_editor__WEBPACK_IMPORTED_MODULE_4__["default"], {
            defaultValue: value ?? '',
            editorConfig: editorConfig,
            maxCharacters: maxCharacters,
            onTextChange: handleInput,
            placeholder: placeholder,
            readOnly: disabled,
            ref: editorRef
        }, void 0, false, {
            fileName: "/var/www/html/dev/pimcore/quill-bundle/assets/studio/js/src/modules/quill-editor/quill-editor.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, undefined)
    }, void 0, false, {
        fileName: "/var/www/html/dev/pimcore/quill-bundle/assets/studio/js/src/modules/quill-editor/quill-editor.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, undefined);
    function startTimeout(content) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(()=>{
            if (onChange !== undefined && onChange !== null) {
                onChange(content);
            }
        }, 700);
    }
}, "OdAZxbN8IqDBNmOLyFtYsD59xNM=", false, function() {
    return [
        _quill_editor_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles
    ];
})), "OdAZxbN8IqDBNmOLyFtYsD59xNM=", false, function() {
    return [
        _quill_editor_styles__WEBPACK_IMPORTED_MODULE_2__.useStyles
    ];
});
_c1 = QuillEditor;
QuillEditor.displayName = 'QuillEditor';
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuillEditor);
var _c, _c1;
$RefreshReg$(_c, "QuillEditor$forwardRef");
$RefreshReg$(_c1, "QuillEditor");

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),
"./js/src/plugins.ts": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  QuillPlugin: () => (QuillPlugin)
});
/* ESM import */var _modules_quill_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./js/src/modules/quill-editor/index.tsx");
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

if (true) {
    module.hot.accept();
}
const QuillPlugin = {
    name: 'pimcore-quill-plugin',
    // Register and overwrite services here
    onInit: (param)=>{
        let { container } = param;
    },
    // register modules here
    onStartup: (param)=>{
        let { moduleSystem } = param;
        moduleSystem.registerModule(_modules_quill_editor__WEBPACK_IMPORTED_MODULE_0__.QuillEditorModule);
        console.log('Hello from quill.');
    }
};

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),

}]);
//# sourceMappingURL=__federation_expose_default_export.js.map
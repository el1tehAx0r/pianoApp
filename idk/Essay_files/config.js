/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
    // config.uiColor = '#AADC6E';

    //want to use browser spell check, not a third party tool
    //removing contextmenu allows user to right click in CKEditor text and see browser spell check options. 
    config.removePlugins = 'liststyle,tableselection,tabletools,scayt,contextmenu';
    config.disableNativeSpellChecker = false;

    //remove small triangle in bottom right corner that allows resizing.
    config.resize_enabled = false; 
};

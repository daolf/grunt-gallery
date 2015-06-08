/* @example
 * new Ext.Viewport({
 *     layout: 'border',
 *     items: [{
 *         region: 'north',
 *         autoHeight: true,
 *         border: false,
 *         margins: '0 0 5 0'
 *     }, {
 *         region: 'west',
 *         collapsible: true,
 *         title: 'Navigation',
 *         width: 200
 *     }, {
 *         region: 'south',
 *         title: 'Title for Panel',
 *         collapsible: true,
 *         html: 'Information goes here',
 *         split: true,
 *         height: 100,
 *         minHeight: 100
 *     }, {
 *         region: 'east',
 *         title: 'Title for the Grid Panel',
 *         collapsible: true,
 *         split: true,
 *         width: 200,
 *         // remaining grid configuration not shown ...
 *         // notice that the GridPanel is added directly as the region
 *         // it is not "overnested" inside another Panel
 *     }, {
 *         region: 'center',
 *         xtype: 'tabpanel', // TabPanel itself has no title
 *         items: {
 *             title: 'Default Tab',
 *             html: 'The first tab\'s content. Others may be added dynamically'
 *         }
 *     }]
 * });
 */
/*
This file is part of Ext JS 3.4

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-04-03 15:07:25
*/
/**
 * @class Ext.Viewport
 * @extends Ext.Container
 * <p>A specialized container representing the viewable application area (the browser viewport).</p>
 * <p>The Viewport renders itself to the document body, and automatically sizes itself to the size of
 * the browser viewport and manages window resizing. There may only be one Viewport created
 * in a page. Inner layouts are available by virtue of the fact that all {@link Ext.Panel Panel}s
 * added to the Viewport, either through its {@link #items}, or through the items, or the {@link #add}
 * method of any of its child Panels may themselves have a layout.</p>
 * <p>The Viewport does not provide scrolling, so child Panels within the Viewport should provide
 * for scrolling if needed using the {@link #autoScroll} config.</p>
 * <p>An example showing a classic application border layout:</p><pre><code>
</code></pre>
 * @constructor
 * Create a new Viewport
 * @param {Object} config The config object
 * @xtype viewport
 */
Ext.Viewport = Ext.extend(Ext.Container, {
    /*
     * Privatize config options which, if used, would interfere with the
     * correct operation of the Viewport as the sole manager of the
     * layout of the document body.
     */
    /**
     * @cfg {Mixed} applyTo @hide
     */
    /**
     * @cfg {Boolean} allowDomMove @hide
     */
    /**
     * @cfg {Boolean} hideParent @hide
     */
    /**
     * @cfg {Mixed} renderTo @hide
     */
    /**
     * @cfg {Number} height @hide
     */
    /**
     * @cfg {Number} width @hide
     */
    /**
     * @cfg {Boolean} autoHeight @hide
     */
    /**
     * @cfg {Boolean} autoWidth @hide
     */
    /**
     * @cfg {Boolean} deferHeight @hide
     */
    /**
     * @cfg {Boolean} monitorResize @hide
     */

    initComponent : function() {
        Ext.Viewport.superclass.initComponent.call(this);
        document.getElementsByTagName('html')[0].className += ' x-viewport';
        this.el = Ext.getBody();
        this.el.setHeight = Ext.emptyFn;
        this.el.setWidth = Ext.emptyFn;
        this.el.setSize = Ext.emptyFn;
        this.el.dom.scroll = 'no';
        this.allowDomMove = false;
        this.autoWidth = true;
        this.autoHeight = true;
        Ext.EventManager.onWindowResize(this.fireResize, this);
        this.renderTo = this.el;
    },

    fireResize : function(w, h){
        this.fireEvent('resize', this, w, h, w, h);
    }
});
Ext.reg('viewport', Ext.Viewport);

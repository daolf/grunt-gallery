Ext.ns('Lyra');
/*
 *  @example
 *              var myLyraWin = new Lyra.Window({
 *                  renderTo: Ext.getBody(),
 *                  width: 400,
 *                  height: 300,
 *                  items: [
 *                      {  width: '100%',
 *                       height: '100%',
 *                       title: 'Container Panel',
 *                       xtype:'panel'}
 *                  ]
 *              });
 *              myLyraWin.show();
 */
Lyra.Window = Ext.extend(Ext.Window, {
    constrainHeader: true,
    keepAliveBeforeShow: false,
    keepAliveAfterClose: true,

    /** Message de demande de confirmation à la fermeture de la fenêtre */
    closeConfirmation: null,

    initComponent: function () {
        Lyra.Window.superclass.initComponent.call(this);
        this.on('beforeclose', this.closeConfirmationHandler, this);
    },

    /** Surcharge de la méthode show pour prendre en compte le keepAlive automatisé */
    show: function () {
        var superShow = Lyra.Window.superclass.show;
        var args = arguments; // mot clé JS : les args de la méthode show
        superShow.apply(this, args);
        
    }
});
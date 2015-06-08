Ext.onReady(function () {

    var myGenreList = new Ext.data.ArrayStore({
        data : [
            ['male'],['female']
        ],
        fields : ['genre']
    });

    var myMonthsStore = new Ext.data.ArrayStore({
        data : [
            ['January'],
            ['February'],
            ['March']
        ],
        fields : ['month']
    });

    // Very ugly
    var myDaysStore = new Ext.data.ArrayStore({
        data : [
            [1],
            [2],
            [3],
            [4]
        ],
        fields : ['day']
    }); 

    var myYearsStore = new Ext.data.ArrayStore({
        data : [
            [1990],
            [1992],
            [1993],
            [1994]
        ],
        fields : ['year']
    }); 

    var birthDateForm = new Ext.form.FormPanel({
        labelWidth : 100,
        labelField : 'Date of birth',
        items: [
            new Ext.form.ComboBox({
                width : 50,
                value : 1,
                typeAhead : false, // autocompletion
                fieldLabel : 'Day',
                store : myDaysStore,
                displayField : 'day',
                mode : 'local' // !!! if 
            }),
            new Ext.form.ComboBox({
                width : 70,
                typeAhead : true, // autocompletion
                fieldLabel : 'Months',
                store : myMonthsStore,
                displayField : 'month',
                mode : 'local' // !!! if 
            }),
            new Ext.form.ComboBox({
                width : 60,
                typeAhead : true, // autocompletion
                fieldLabel : 'Day',
                store : myYearsStore,
                displayField : 'year',
                mode : 'local' // !!! if 
            })
        ]
    });

    var myForm = new Ext.form.FormPanel({
        labelWidth : 100,
        items: [
            new Ext.form.Field({
                fieldLabel : 'Last name',
                name: 'name'
            }),
            new Ext.form.Field({
                fieldLabel : 'First name',
                name: 'surname'
            }),
            new Ext.form.NumberField({
                fieldLabel : 'Age (1-99)',
                xtype : 'numberfield',
                decimalPrecision : 3,
                minValue : 1,
                maxValue : 99,
                msgTarget : 'side'
            }),
            new Ext.form.ComboBox({
                typeAhead : true, // autocompletion
                fieldLabel : 'You are',
                store : myGenreList,
                displayField : 'genre',
                mode : 'local' // !!! if 
            })
        ]
    });

    var myWin = new Ext.Window({
        title : 'Bonjour',
        items : [
            myForm,
            birthDateForm
        ]
    });
    myWin.setPagePosition(50,50);
    myWin.show(this);
});
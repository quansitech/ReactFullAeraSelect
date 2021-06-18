import React from 'react';
import ReactDOM from 'react-dom';

import FullAreaSelect from './components/FullAreaSelect';


function ReactFullAreaSelect(id, opt){
    const DEFAULT_OPT = { level: 3};
    let options = Object.assign({}, DEFAULT_OPT, opt);
    const el = typeof id === 'string' ? document.getElementById(id) : id;
    const PARENT_ELEMENT = el.parentElement;

    const WRAPPER_DOM  = document.createElement( 'div');
    WRAPPER_DOM.className = 'area-select';
    WRAPPER_DOM.appendChild(el);

    PARENT_ELEMENT.appendChild(WRAPPER_DOM);

    setTimeout(()=>{
        ReactDOM.render(<FullAreaSelect {...options} />, WRAPPER_DOM);
    });
}

window.ReactFullAreaSelect = ReactFullAreaSelect;

if(window.jQuery){
    (function ($){
        $.fn.reactFullAreaSelect = function (opt){
            const data = this.data();
            const name = this.attr('name');
            const value = this.val();
            const options = {
                value,
                name,
            };
            opt = {...options, ...opt, ...data};
            ReactFullAreaSelect(this.get(0), opt);
        };

        $(function (){
            $('[data-react-full-area-select]').each(function (){
                $(this).reactFullAreaSelect();
            });
        });
    })(jQuery);
}

export default ReactFullAreaSelect;
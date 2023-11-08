import React from 'react';

const Texto = (props) =>{
return (<div>
    <h1>
        {props.textoMostrar}
    </h1>
 <button onClick={props.funcionEjecutar}> LIMPIAR</button>
</div>)
}

export default Texto;
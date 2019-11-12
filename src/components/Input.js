import React from 'react'
import '../styles/components.css'

const Input = ({type="text", disabled, label, value='', onChange, choices, selected}) => {

    if (type==='text') {
        return (
            <React.Fragment>
                <label>{label}</label>
                <input disabled={disabled} type={type}  onChange={onChange} value={value} className="form-control" />
                <br />
            </React.Fragment>
        )
    }
    else if (type==='autoComplete'){
        return(
            <React.Fragment>
                <label>{label}</label>
                <input disabled={disabled} type="text" id="" onChange={onChange} value={value} className="form-control" />
                <div id="autocomplete-result" class="border-right border-left border-bottom">
                    <ul>
                        {choices.map((item,index)=>{
                            return(
                                <li className="border-bottom">{item}</li>
                            )
                        })}
                    </ul>
                </div>
                <br />
            </React.Fragment>
        )
    }
    else{
        return (
            <div>
                <h5>{label}</h5>
                <div className="custom-control custom-checkbox">
                    {choices.map((item,index)=>{
                        const isChecked = selected.indexOf(item)!==-1 ? true : false
                        return(
                            <div key={index}>
                                <input disabled={disabled} key={index} checked={isChecked} onChange={ (e)=>onChange(e,item)}  type="checkbox" className="custom-control-input" id={item} />
                                <label className="custom-control-label" htmlFor={item} >{item}</label>
                            </div>
                        )
                    })}
                        <br />
                </div>
            </div>
        )
    }
}
export default Input
import React,{ useState,useEffect } from 'react'
import '../styles/components.css'

const Input = ({type="text", disabled, label, value='', onChange, choices, selected,onSelect}) => {
    const [isActive,setIsActive] = useState(false)
    const [inputVal,setInputVal] = useState('')
    
    const autoCompleteOnChange = (e) => {
        if (value._id){
            setInputVal('')
            
        }
        else{
            setInputVal(e.target.value)
        }
        onChange(e)
    }
    
    const autoCompleteOnBlur = (e) => {
        setTimeout(()=>{
            if (!value){
                setInputVal('')
            }
            setIsActive(false)
        },200)
    }

     if (type==='autoComplete'){
        //  for pet owners
        return(
            <React.Fragment>
                <label>{label}</label>
                <input onChange={(e) => autoCompleteOnChange(e)} onFocus={() => setIsActive(true)} 
                        onBlur={ (e) =>  autoCompleteOnBlur(e) }
                        disabled={disabled} type="text"
                        value={ value ? `${value.firstname} ${value.lastname} < ${value.email} > ` : inputVal} 
                        className="form-control" />
                {isActive && !value._id ?
                <div id="autocomplete-result" className="border-right border-left border-bottom">
                  {!choices ?
                    <ul>
                        <li className="border-bottom">No result found.</li>
                    </ul>
                    :
                    <ul>
                        {choices.map((item,index)=>{
                        return(
                            <li key={index} className="border-bottom" onClick={() => onSelect(item)}>{item.firstname} {item.lastname} | {item.email} |</li>
                        )
                        })}
                    </ul>}
                </div>
                :''}
                <br />
            </React.Fragment>
        )
    }
    else if (type==='select'){
        return (
            <div>
                {/* <h5>{label}</h5> */}
                    <label htmlFor="sel1">{label}</label>
                    <select className="form-control" onChange={onChange} value={selected}>
                    [{!selected ? <option  value=''></option> : ''},
                       {choices.map((item, index)=>{
                           return(
                               <option key={index} value={item} >{item}</option>
                           )
                       })}]
                    </select>
                    <br />
                    {/* other input select */}
                 {/* <div className="custom-control custom-checkbox">
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
                 </div> */}
            </div>
        )
    }
    else{
        return (
            <React.Fragment>
                <label>{label}</label>
                <input disabled={disabled} type="select"  onChange={onChange} value={value} className="form-control" />
                <br />
            </React.Fragment>
        )
    }
}
export default Input
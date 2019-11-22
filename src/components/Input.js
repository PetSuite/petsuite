import React,{ useState,useEffect } from 'react'
import '../styles/components.css'


const Input = ({type="text", value='',disabled, label, onChange, choices, selected,onSelect,min,max,params_id='',actions}) => {
    const [isActive,setIsActive] = useState(false)
    const [inputVal,setInputVal] = useState('')
    const [selectList,setSelectList] = useState([])

    const autoCompleteOnChange = async(e) => {
        const val = e.target.value
        if (value){
            setInputVal('')
            onSelect('')
        }
        else{
                const data = await actions(val,params_id)
                setSelectList(data)
                setInputVal(val)
        }
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
                <input onChange={ (e) => autoCompleteOnChange(e) } onFocus={() => setIsActive(true)} 
                        onBlur={ (e) =>  autoCompleteOnBlur(e) }
                        disabled={disabled} type="text"
                        value={value ? Object.entries(value)[1][1] : inputVal} 
                        className="form-control" />
                {isActive && !value._id ?
                <div id="autocomplete-result" className="border-right border-left border-bottom">
                  {!selectList ?
                    <ul>
                        <li className="border-bottom">No result found.</li>
                    </ul>
                    :
                    <ul>
                        {selectList.map((item,index)=>{
                        // for (const [key, value] of Object.entries(item)) {
                            const val = Object.entries(item)[1][1]
                            return(
                                <li key={index} className="border-bottom" onClick={() => onSelect(item)}>{val}</li>
                            )
                        //   }
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
                    <select className="form-control" onChange={onChange} value={selected} disabled={disabled}>
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
    else if (type==='textarea'){

        return (
            <React.Fragment>
                <label>{label}</label>
                <textarea className="form-control" rows="3" value={value} disabled={disabled} onChange={onChange}></textarea>
                <br />
            </React.Fragment>
        )
    }
    else{
        return (
            <div id="input">
                <label>{label}</label>
                <input min={min} max={max} disabled={disabled} type={type}  onChange={onChange} value={value} className="form-control " />
                <br />
            </div>
        )
    }
}
export default Input
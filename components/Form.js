import React, {useState} from 'react';
import formStyles from '../styles/Form.module.css';
import dropStyles from '../styles/FormDrop.module.css';

import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0'
//import FormDropMenu from './FormDropMenu.js'

import { v4 } from 'uuid';


// this will be for initially creating an event
export default withPageAuthRequired(function Form() {
    const {user, error, isLoading} = useUser()
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!user) return;

    const [formValues, setFormValues] = useState([{ name: "", refid: "", entAmount: "", judgeAmount: "", }])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
     }
        
    let addFormFields = () => {
        setFormValues([...formValues, { name: "", refid: "", entAmount: "", judgeAmount: "",  }])
     }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    // this is the function for submitting the creation formn
    const registerEvent = async event => {
        //event.preventDefault() // don't redirect the page
        // where we'll add our form logic
        if (event.target.catName[0]?.value === undefined) {
            // single element,
            return await fetch(`/api/events/create`, {
                body: JSON.stringify({
                    name: event.target.name.value,
                    desc: event.target.desc.value,
                    date: event.target.date.value,
                    deadline: event.target.deadline.value,
                    categories: [
                        {   
                            cName: event.target.catName.value,
                            cId: `${v4()}`,
                            cDesc:event.target.info.value,
                            jNum: event.target.jAmount.value,
                            eNum: event.target.eAmount.value,
                            eScore: 0                       
                        }
                    ]
                }),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                authorization: process.env.APITOKEN
            })
            .catch(e => console.error.bind(e))
            .then(()=> alert('Event sucessfully created ! Redirecting to the dashboard'))
            .catch(er => console.error.bind(er))
            .then(()=> location.href = `/users/dashboard?name=${user.nickname}`);

        } else if (event.target.catName[0].value != undefined) {
            // basically we take each array, return a new one with each array element as a paremeter for an object in the new array
            const cNames = event.target.catName;
            const cInfo = event.target.info;
            const jAmnt = event.target.jAmount;
            const eAmnt = event.target.eAmount;
            let data = [];
            for (let i = 0; i < cNames.length; i++){
                data.push({
                    cName: event.target.catName[i].value,
                    cId: v4(),
                    cDesc: cInfo[i].value,
                    jNum: jAmnt[i].value,
                    eNum: eAmnt[i].value,
                    eScore: 0
                })
            }
            const dataJson = JSON.parse(JSON.stringify(data))
            return await fetch(`/api/events/create`, {
                body: JSON.stringify({
                    name: event.target.name.value,
                    desc: event.target.desc.value,
                    date: event.target.date.value,
                    deadline: event.target.deadline.value,
                    categories: dataJson
                }),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                authorization: process.env.APITOKEN
            })
            .catch(e => console.error.bind(e))
            .then(()=> alert('Event sucessfully created ! Redirecting to the dashboard'))
            .catch(er => console.error.bind(er))
            .then(()=> location.href = `/users/dashboard?name=${user.nickname}`);
        }
    }

    return (
        <form onSubmit={registerEvent} className={formStyles.form}>
            <h1>Create an Event</h1>
            <small>General Event Info</small>
            <li className={formStyles.form_item}>
                <label htmlFor="name" className={formStyles.label}>Name</label>
                <input id="name" type="text" autoComplete="name" required className={formStyles.input}/>
                <a>???</a>
            </li>
            <li className={formStyles.form_item}>
                <label htmlFor="desc" className={formStyles.label}>Description</label>
                <input id="desc" type="text" autoComplete="name" required className={formStyles.input}/>
                <a>???</a>
            </li>
            <li className={formStyles.form_item}>
                <label htmlFor="date" className={formStyles.label}>Date</label>
                <input id="date" type="date" autoComplete="name" required className={formStyles.input}/>
            </li>
            <h2>Competition Info</h2>
            <div className={dropStyles.form}>
                <a>Categories</a>
                <br/><small>** You can add/remove/edit categories in the dashboard</small>
                {formValues.map((e, index)=>(
                    <div className={dropStyles.form_item} key={index}>
                        <label htmlFor="catName" className={dropStyles.label}>Name</label>
                        <input type="text" id="catName" defaultValue={e.name || ""} onChange={e => handleChange(index, e)} className={dropStyles.input} required/>
                        
                        <label htmlFor="catInfo" className={dropStyles.label}>Info</label>
                        <input type="text" id="info" defaultValue={e.info || ""} onChange={e => handleChange(index, e)} className={dropStyles.input} required/>
                        
                        <label htmlFor="jAmount" className={dropStyles.label}>Judges</label>
                        <input type="number" id="jAmount" defaultValue={e.jAmount || ""} onChange={e => handleChange(index, e)} className={dropStyles.input} required/>
                        
                        <label htmlFor="eAmount" className={dropStyles.label}>Entries</label>
                        <input type="number" id="eAmount" defaultValue={e.eAmount || ""} onChange={e => handleChange(index, e)} className={dropStyles.input} required/>
                        {
                            index ? 
                            <button type="button"  className={dropStyles.remove} onClick={() => removeFormFields(index)}>Remove</button> 
                            : null
                        }
                    </div>
                ))}
            </div>
            <div className={dropStyles.button_section}>
                    <button className={dropStyles.label} type="button" onClick={() => addFormFields()}>Add</button>
            </div>
            <li className={formStyles.form_item}>
                <label htmlFor="date" className={formStyles.label}>Deadline</label>
                <input id="deadline" type="date" autoComplete="name" required className={formStyles.input}/>
            </li>
            <button type="submit" className={formStyles.button}>CREATE</button>
        </form>
    )
});

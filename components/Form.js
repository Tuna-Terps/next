import React, {useState} from 'react';
import formStyles from '../styles/Form.module.css';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0'
import FormDropMenu from './FormDropMenu.js'

// this will be for initially creating an event
export default withPageAuthRequired(function Form() {
    const {user, error, isLoading} = useUser()
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if(!user) return;
    const [catDivCount, set_catDivCount] = useState(1);
    console.log(catDivCount)

    // this is the function for submitting the creation formn
    const registerEvent = async event => {
        event.preventDefault() // don't redirect the page
        // where we'll add our form logic
        const res = await fetch(`/api/events/create`, {
            body: JSON.stringify({
              name: event.target.name.value,
              desc: event.target.desc.value,
              date: event.target.date.value,
              catAmount: event.target.categories.value,
              deadline: event.target.deadline.value
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            authorization: process.env.APITOKEN
          })
      
          const result = await res.json()
          // result._user.nameVal => 'User'
          console.log(result)
    }

    return (
        <form onSubmit={registerEvent} className={formStyles.form}>
            <h2>Create an Event</h2>
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
            <small>Competition Info</small>
            <li className={formStyles.form_item}>
                <label htmlFor="categories" className={formStyles.label}>Category Amount</label>
                <div className={formStyles.mainselection}>
                    <select className={formStyles.select} id="categories" required>
                        <option></option>
                        <option className={formStyles.option} value="1">1</option>
                        <option className={formStyles.option} value="2">2</option>
                        <option className={formStyles.option} value="3">3</option>
                        <option className={formStyles.option} value="4">4</option>
                        <option className={formStyles.option} value="5">5</option>
                        <option className={formStyles.option} value="6">6</option>                               
                    </select>
                </div>
            </li>
            <li className={formStyles.form_item}>
                <label htmlFor="date" className={formStyles.label}>Deadline</label>
                <input id="deadline" type="date" autoComplete="name" required className={formStyles.input}/>
            </li>

            <div>
                <div onClick={() => set_catDivCount(catDivCount + 1) }>
                    Add another entry
                </div>
                <div onClick={() => set_catDivCount(catDivCount - 1) }>
                    Remove entry
                </div>
            </div>
            <FormDropMenu/>
            <button type="submit" className={formStyles.button}>Register</button>
            
        </form>
    )
});

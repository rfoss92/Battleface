import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';
import _uniqueId from 'lodash/uniqueId';

export default function GetQuotation() {
    const [ages, setAges] = useState([]);
    const [people, setPeople] = useState([<Input id='prefix-0' ages={ages} setAges={setAges} />]);
    const [start, setStart] = useState(new Date().toISOString().split('T')[0]);
    const [end, setEnd] = useState();
    const [JWT, setJWT] = useState();
    const [toDelete, setToDelete] = useState();

    useEffect(() => {
        getAuth();
        if (toDelete) {
            removePerson(toDelete.target.id)
        }
    }, [toDelete]);

    const removePerson = (id) => {
        setPeople(people.filter(person => {
            return person.props.id !== id;
        }));
    };
    
    const addPerson = (e) => {
        e.preventDefault();
        const id = _uniqueId('prefix-')
        setPeople(prevPeople => [...prevPeople, <Input id={id} ages={ages} setAges={setAges} setToDelete={setToDelete} />]);
    };

    async function getAuth() {
        const res = await fetch('api/auth', {
            method: 'get',
            headers: { 
                'Content-Type': 'application/json'
            }
        });
        if (res.status >= 200 && res.status <= 299) {
            const JWT = await res.text();
            setJWT(JWT);
        } else {
            console.log(res.status, res.statusText);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('api/quotation', {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JWT,
            },
            body: JSON.stringify({
                ages: ages.toString(),
                start: start,
                end: end,
                currency_id: 'USD',
            })
        });
        if (res.status >= 200 && res.status <= 299) {
            let data = await res.text();
            data = JSON.parse(data)
            $('#total').html(data.total);
        } else {
            console.log(res.status, res.statusText);
        } 
    }

    return (
        <>
            <form id="quoteForm" method="post" action="authenticate.php" onSubmit={handleSubmit}>
                <h1>Tell us about you.</h1>
                <div>
                    <label>What is your age?</label>
                    {people.map((item, i) => (
                        <div key={i}>{item}</div>
                    ))}
                </div>
                <button onClick={addPerson}>Add Person</button>
                <div>
                    <label>Departure date:</label>
                    <input id="start" name="start" type="date" min={start} max={end} onInput={(e) => setStart(e.target.value)} />
                    <label>Return date:</label>
                    <input id="end" name="end" type="date" min={start} onInput={(e) => setEnd(e.target.value)} />
                </div>
                <button type="submit">Get your quote!</button>
            </form>
            <div className="quote-area">
                <div>
                    Your quote is: <span id="total"></span>
                </div>
            </div>
        </>
    );
}

if (document.getElementById('quotation')) {
    ReactDOM.render(<GetQuotation />, document.getElementById('quotation'));
}
import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 

class Home extends Component {
    onsubmit(e) {
        e.preventDefault();

        let fetchData = { 
            method: 'POST', 
            body: "link=http://localhost/helloworld",
            mode: 'no-cors',
            headers: new Headers({
                "Accept": 'application/json',
                "Content-Type": "application/x-www-form-urlencoded",
              })
        }
        fetch("http://localhost:14678/api/v1/shortenlink", fetchData)
        .then(function() {
            // Handle response you get from the server
        });
        
    }

    render() {
        return (
                <Form inline onSubmit={e => this.onsubmit(e)}>
                    <FormGroup controlId="formInlineUrl">
                        <ControlLabel>Url</ControlLabel>
                        {' '}
                        <FormControl type="text" placeholder="Type or paste URL to shorten it" />
                    </FormGroup>
                    {' '}
                    <Button bsStyle="primary" type="submit" >
                        Shorten
                    </Button>
                </Form>
        );
    }
}

export default Home;

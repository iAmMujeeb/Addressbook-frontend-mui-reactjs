import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, FormGroup, CssBaseline, TextField, Button, Container, AppBar, Typography, OutlinedInput, FormHelperText } from '@mui/material';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import Cancel from '../../assets/images/cancel.jpeg';
import AddService from '../../service/add-service';
import './add-form.scss'

const AddForm = () => {

    let initialValue = {
        fullName: '',
        phoneNumber: '',
        emailId: '',
        address: '',
        state: '',
        city: '',
        zip: '',
        isUpdate: false
    }

    const [formValue, setForm] = useState(initialValue);

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getDataById(params.id);
        }
    }, [params.id]);

    const getDataById = (id) => {
        AddService.getContactById(id)
            .then((response) => {
                let object = response.data.data;
                setData(object);
            })
            .catch((error) => {
                alert("Error is", error)
            });
    };

    const setData = (object) => {
        console.log(object);
        setForm({
            ...formValue,
            ...object,
            id: object.id,
            isUpdate: true,
            fullName: object.fullName,
            phoneNumber: object.phoneNumber,
            address: object.address,
            emailId: object.emailId,
            state: object.state,
            city: object.city,
            zip: object.zip
        });
    };

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
        console.log(formValue);
    }

    const save = async (event) => {
        event.preventDefault();
        // if (await validData()){
        //     console.log('error', formValue);
        //     return;
        // }
        let object = {
            fullName: formValue.fullName,
            phoneNumber: formValue.phoneNumber,
            address: formValue.address,
            emailId: formValue.emailId,
            state: formValue.state,
            city: formValue.city,
            zip: formValue.zip
        }
        if (formValue.isUpdate) {
            var answer = window.confirm(
                "Data once modified cannot be restored! Do you wish to continue?"
            );
            if (answer === true) {
                AddService.updateContactById(params.id, object)
                    .then((data) => {
                        console.log(data.data.data);
                        alert("Data updated successfully!");
                    })
                    .catch((error) => {
                        toast.error("WARNING!! Error while updating the data!", error);
                    });
            } else {
                window.location.reload();
            }
        } else {
            AddService.createNewContact(object)
                .then((response) => {
                    console.log(response.data.data);
                })
                alert("Data added successfully!");
        }
    }

    return (
        <Container>
            <CssBaseline />
            <div className="payroll-main">
                <div className="content">
                    <form className="form" action="#" onSubmit={save}>
                        <div className="formhead" style={{backgroundColor:'#008CFF', textAlign: 'center', height:'108px'}}>
                        <Typography className="formheadtext" sx={{ color:"white",textAlign: 'center'}} variant="h4" gutterBottom>
                            PERSON ADDRESS FORM
                            <a className="addbutton" href='/' routerLink="/add">
                                <img src={Cancel} alt="" /></a>
                        </Typography>
                        </div>
                        <div><br />
                            <FormControl sx={{ width: '100%' }}>
                                <TextField name="fullName" id="fullName" value={formValue.fullName} onChange={changeValue} helperText="Please enter your full name" label="Full Name" variant="outlined" />
                            </FormControl>
                        </div><br />
                        <div>
                            <FormControl sx={{ width: '100%' }}>
                                <TextField type="number" name="phoneNumber" id="phoneNumber" value={formValue.phoneNumber} onChange={changeValue} helperText="Please enter your phone number" label="Phone Number" variant="outlined" />
                            </FormControl>
                        </div><br />
                        <div>
                            <FormControl sx={{ width: '100%' }}>
                                <TextField type="email" name="emailId" id="emailId" value={formValue.emailId} onChange={changeValue} helperText="Please enter your email id" label="Email Id" variant="outlined" />
                            </FormControl>
                        </div><br />
                        <div>
                            <FormControl sx={{ width: '100%' }}>
                                <TextField onChange={changeValue} value={formValue.address} name="address" helperText="Please enter your address" multiline rows={4} id="adress" label="Address" variant="outlined" />
                            </FormControl>
                        </div><br />
                        <FormGroup row>
                            <FormControl sx={{width:'30%', marginRight:'48px'}}>
                                <InputLabel id="state">City</InputLabel>
                                <Select 
                                    helperText="Please select your city"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formValue.city}
                                    name="city"
                                    label="Age"
                                    onChange={changeValue}
                                >
                                    <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
                                    <MenuItem value={'Delhi'}>Delhi</MenuItem>
                                    <MenuItem value={'Hyderabad'}>Hyderabad</MenuItem>
                                </Select>
                                <FormHelperText>Please select your city</FormHelperText>
                            </FormControl>
                            <FormControl sx={{width:'30%', marginRight:'48px' }}>
                                <InputLabel id="state">State</InputLabel>
                                <Select
                                    helperText="Please select your state"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formValue.state}
                                    name="state"
                                    label="Age"
                                    onChange={changeValue}
                                >
                                    <MenuItem value={'Maharashtra'}>Maharashtra</MenuItem>
                                    <MenuItem value={'Rajasthan'}>Rajasthan</MenuItem>
                                    <MenuItem value={'Up'}>UP</MenuItem>
                                </Select>
                                <FormHelperText>Please select your state</FormHelperText>
                            </FormControl>
                            <FormControl sx={{width:'30%'}}>
                                <TextField type="number" name="zip" id="zip" value={formValue.zip} onChange={changeValue} helperText="Please enter your zip code" label="Zip Code" variant="outlined" />
                            </FormControl>
                        </FormGroup><br />
                        <div>
                            <FormControl sx={{alignContent:'end'}}>
                                <FormGroup row>
                                    <Button type='submit' sx={{ marginRight: '20px', height: '53px', width: '180px' }} variant="contained">{formValue.isUpdate ? 'Update' : 'Add'}</Button>
                                    <Button sx={{ height: '53px', width: '180px' }} onClick={reset} variant="contained">Reset</Button>
                                </FormGroup>
                            </FormControl>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default AddForm
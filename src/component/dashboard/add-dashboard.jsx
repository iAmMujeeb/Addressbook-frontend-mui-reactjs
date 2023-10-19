import React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, Typography, FormGroup, Button, FormControl } from '@mui/material';
import Delete from '../../assets/icons/delete-black-18dp.svg';
import Edit from '../../assets/icons/create-black-18dp.svg';
import Add from '../../assets/icons/add-24px.svg';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddService from '../../service/add-service';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const navigate = useNavigate();

    const Update = (id) => {
        navigate(`editcontact/${id}`);
        console.log(id);
    };

    const [rows, setRows] = useState([]);

    useEffect(() => {

        AddService.getAllContacts()
            .then((response) => {
                setRows(response.data.data)
            })
    }, []);

    const remove = (id) => {
        console.log(id);
        var answer = window.confirm("Data once deleted cannot be restored!! Do you wish to continue ?");
        if (answer === true) {
            AddService.deleteContactById(id)
                .then((data) => {
                    alert("Contact deleted successfully!!");
                    window.location.reload();
                })
                .catch((error) => {
                    toast.error("Something went wrong!", error);
                })
        } else {
            alert("Contact Not Deleted!");
        }
    };

    return (
        <div>
            <div className="formhead" style={{width:'100%', marginTop:'2%', marginBottom:'2%'}} >
            <FormGroup row>
                    <Typography sx={{marginLeft:'12.5%'}} variant='h4'>
                        Person Details
                    </Typography>
                    <Button href='addform' sx={{marginLeft:'52%'}} variant="contained">Add Person</Button>
                </FormGroup>
            </div>
            <Container>
                <TableContainer>
                    <Table>
                        <TableRow stickyHeader aria-label="sticky table" sx={{ backgroundColor: 'black', color: 'white' }}>
                            <TableCell component="th" >Full Name</TableCell>
                            <TableCell component="th" >Address</TableCell>
                            <TableCell component="th" >City</TableCell>
                            <TableCell component="th" >State</TableCell>
                            <TableCell component="th" >Zip Code</TableCell>
                            <TableCell component="th" >Phone Number</TableCell>
                            <TableCell component="th" sx={{ width: '10%' }} >Action</TableCell>
                        </TableRow>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="td" >{row.fullName}</TableCell>
                                    <TableCell component="td" >{row.address}</TableCell>
                                    <TableCell component="td" >{row.city}</TableCell>
                                    <TableCell component="td" >{row.state}</TableCell>
                                    <TableCell component="td" >{row.zip}</TableCell>
                                    <TableCell component="td" >{row.phoneNumber}</TableCell>
                                    <TableCell component="td" >
                                        <IconButton component="td" onClick={() => remove(row.id)} >
                                            <img src={Delete} alt="delete" />
                                        </IconButton>
                                        <IconButton onClick={() => Update(row.id)}>
                                            <img src={Edit} alt="edit" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}

export default Dashboard
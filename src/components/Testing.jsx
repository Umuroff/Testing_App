import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import {TextField} from "@mui/material";
import {logDOM} from "@testing-library/react";
import {Card, Col, Form, Input, Row} from "antd";
import "./Testing.css"
import AddPerson from "./AddPerson";
import {modalShow} from "./shared/api";
import {
    CreditCardOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    MailOutlined,
    PhoneOutlined,
    SettingOutlined, UserAddOutlined,
    UserOutlined
} from '@ant-design/icons'
import EditModal from "./EditModal";
import DeletePerson from "./DeletePerson";

function Testing(props) {
    const [streets, setStreets] = useState([])
    const [houses, setHouses] = useState([])
    const [homes, setHomes] = useState([])
    const [street, setStreet] = React.useState({});
    const [house, setHouse] = React.useState({});
    const [home, setHome] = React.useState({});
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [persons, setPersons] = useState([])


    const onStreetChange = (event, values) => {
        setStreet(values)
    }
    const onHouseChange = (event, values) =>{
        setHouse(values)
    }

    const onHomeChange = (event, values) =>{
        setHome(values)
    }

    const GetStreets = () =>{
        axios({
            url:'Request/streets',
            method:'GET',
        }).then(res=>{
            setStreets(res.data)
        })
    }
    const GetHouses = () => {
        if (street == null){
            return
        }
        else{
            axios({
                url:'Request/houses/'+street.id,
                method:'GET',
            }).then(res=>{
                setHouses(res.data)
            })
        }
    }
    const GetHomes = () => {
        if (house == null){
            return
        }
        else {
            axios({
                url: 'Request/house_flats/' + house.id,
                method: 'GET',
            }).then(res => {
                setHomes(res.data)
            })
        }
    }
    const GetPersons = () =>{
        if (home == null){
            return
        }
        else {

            axios({
                url: 'HousingStock/clients',
                method: 'GET',
                params:{addressId:home.id}
            }).then(res => {
                setPersons(res.data)


            })
        }
    }
    const [personName,setPersonName] =useState('')
    const [personEmail,setPersonEmail] =useState('')
    const [personPhone,setPersonPhone] =useState('')
    const [personId,setPersonId] =useState('')

    const handleEdit = (name,phone,email) => {
        setPersonPhone(phone)
        setPersonName(name)
        setPersonEmail(email)
        setPersonId(personId)
      setShowEditModal(true)
    }
    const handleDelete = (personId) => {
      setPersonId(personId)
        setShowDeleteModal(true)
    }
    useEffect(() => {
        GetStreets()
    },[])
    useEffect(() => {
        GetHouses()
    },[street])
    useEffect(() => {
        GetHomes()
    },[house])
    useEffect(() => {
        GetPersons()
    },[home])



    return (
        <div className='container'>
            <div className='Search'>

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ width: 500 }}
                options={streets}
                getOptionLabel={option => option.name}
                // defaultValue={[streets[13]]}
                onChange={onStreetChange}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Улица"
                    />
                )}
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ width: 300 }}
                options={houses}
                getOptionLabel={option => option.name}
                // defaultValue={[streets[13]]}
                onChange={onHouseChange}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Дом"
                    />
                )}
            />

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ width: 200 }}
                options={homes}
                getOptionLabel={option => option.name}
                // defaultValue={[streets[13]]}
                onChange={onHomeChange}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Кв./офис"
                    />
                )}
            />

            </div>
            <div className='cards'>
                <div className='cards_alement'>
                <div className='nameAdress'>
                    {home.name && <b>{'ул.'+street.name + ', '+house.name + ', '+home.name}</b>}

                </div>
                <div className='actionIcons'>
                <span><UserAddOutlined style={{fontSize:'15px', marginRight:"2rem",cursor:'pointer'}} onClick={()=>setShowAddModal(true)} /> </span>
                <span><CreditCardOutlined  style={{fontSize:'15px',cursor:'pointer'}} /> </span>
                </div>
                </div>
                <Row gutter={16}>
                    { persons.length > 0 && persons.map((item,id) =>
                        <Col span={6} key={id}>
                            <Card
                                style={{ width: 300, marginTop: 16 }}

                                actions={[
                                    <DeleteOutlined  key="delete"  onClick={()=>handleDelete(item.id)} />,
                                    <EditOutlined key="edit" onClick={()=>handleEdit(item.name, item.phone, item.email, item.id)}/>,
                                ]}
                            >
                                <Row gutter={24}>
                                    <Col span={6}>
                                        <UserOutlined style={{fontSize:'36px',color:'blue'}}/>
                                    </Col>
                                    <Col span={18}>
                                        <Row>
                                            <span>{item.name}</span>
                                        </Row>
                                        <Row>
                                            <span style={{color:'green'}}><PhoneOutlined />  {item.phone}</span>
                                        </Row>
                                        <Row>
                                            <span><MailOutlined style={{fontSize:'12px'}}/>  {item.email}</span>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    )}
                </Row>

            </div>

            {showAddModal && <AddPerson open={showAddModal} action={setShowAddModal} street={street.name} house={house.name} home={home.name}/>}
            {showEditModal && <EditModal open={showEditModal} action={setShowEditModal} street={street.name} house={house.name} home={home.name} personId={personId} />}
            {showDeleteModal && <DeletePerson open={showDeleteModal} action={setShowDeleteModal} personId={personId} />}

            </div>
    );
}
export default Testing;
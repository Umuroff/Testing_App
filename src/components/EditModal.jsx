import React, {useState} from 'react';
import {Form, Input, Modal} from "antd";
import {changeModal} from "./shared/api";
import {Button} from "@mui/material";
import axios from "axios";
import {UserAddOutlined} from "@ant-design/icons";

function EditModal(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')


    const [isModalVisible, setIsModalVisible] = useState(props.open);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        props.action(false)
    };

    const editPersons = () => {
        let person = {
            AddressId:props.home ,
            ClientId:props.personId
        }
        axios({
            url: 'HousingStock/bind_client' ,
            method: 'POST',
            data:person

        }).then(res => {
            console.log(res)
            props.action(false)
        })
    }

    return (
        <>
            <Modal title={<span><UserAddOutlined style={{fontSize:'35px', color:'blue',marginRight:'2rem'}} />   Изменить жильца</span> } visible={isModalVisible} onOk={handleCancel}  onCancel={handleCancel}
                   footer={[
                       <>
                           <Button key="submit" type="primary"  onClick={()=>props.action(false)}>
                               Отмена
                           </Button>
                           <Button key="submit" type="primary" onClick={()=>editPersons()}>
                               Добавить
                           </Button>
                       </>

                   ]}

            >

                {props.home &&  <b> {'ул.'+props.street+ ', ' + props.house + ', ' + props.home}</b>}

                <div className='addPersons'>
                    <Form className='Form_Persons'>

                        <Form.Item style={{marginBottom:'0px', display:'flex'}}>
                            <Form.Item
                                label="Телефон"
                                name="telephone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожалуйста, введите Телефон',
                                    },
                                ]}
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)',marginRight:'0.5rem'}}
                            >
                                <Input addonBefore='+7'
                                       onChange={event => setPhone(event.target.value)}
                                />

                            </Form.Item>
                            <Form.Item
                                label="e-mail"
                                name="e-mail"
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            >
                                <Input
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="Ф.И.О"
                            name="FIO"
                            style={{ display: 'inline-block', width: 'calc(80% - 8px)' }}
                        >
                            <Input
                                onChange={event => setName(event.target.value)}
                            />
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </>
    );
}

export default EditModal;

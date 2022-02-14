import React, {useState} from 'react';
import {Modal} from "antd";
import {Button} from "@mui/material";
import {UserAddOutlined} from "@ant-design/icons";
import axios from "axios";

function DeletePerson(props) {
    const [isModalVisible, setIsModalVisible] = useState(props.open);
    const handleCancel = () => {
        props.action(false)
    };
    const deletePerson = () => {
        axios({
            url: '/HousingStock/bind_client/'+props.personId ,
            method: 'DELETE',
        }).then(res => {
            props.action(false)
        })
    }
    return (
        <>
        <Modal
            title={<span><UserAddOutlined style={{fontSize:'35px', color:'blue',marginRight:'2rem'}} />   Изменить жильца</span> } visible={isModalVisible} onOk={handleCancel}  onCancel={handleCancel}
            footer={[
                <>
                    <Button key="submit" type="primary"  onClick={()=>props.action(false)}>
                        Отмена
                    </Button>
                    <Button key="submit" type="primary" onClick={()=>deletePerson()}>
                        Удалит
                    </Button>
                </>

            ]}>
            <span>
                Вы подтверждаете удаление
            </span>
        </Modal>
        </>
    );
}

export default DeletePerson;
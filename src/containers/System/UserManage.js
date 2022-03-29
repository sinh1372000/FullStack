import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ModalUser from './ModalUser';
import './UserManage.scss'
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService } from '../../services/userService'


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arruser: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('All');
        if (response && response.errCode == 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        });
    }
    toggle = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        });
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errCode)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                });
            }
            console.log('check response :', response);
        } catch (e) {
            console.log(e);
        }
        console.log('check data child :', data);

    }


    render() {
        console.log('check render ', this.state)
        let arrUsers = this.state.arrUsers
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggle={this.toggle}
                    createNewUser={this.createNewUser}


                />
                <div className='title text-center'>User users with Dinh Ly</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => { this.handleAddNewUser() }}
                    ><i className='fas fa-plus'></i>Add new users</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Adress</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>



                    </table>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

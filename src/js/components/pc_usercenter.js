import React, { Component } from 'react';
import {Row, Col} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal,
	Card,
    notification,
    Upload
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import { Router, Route, Link, browserHistory } from 'react-router';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

export default class PCUserCenter extends Component{
    constructor() {
        super();
        this.state = {
            userCollection:'',
            previewImage: '',
            previewVisible: false
        }
    }

    componetDidMount() {
        var myFetchOptions = {
            method: 'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ userCollection: json });
            });
        
        
    };

    


    render() {
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            onPreview: (file) => {
                this.setState({ previewImage: file.url, previewVisible: true });
            }
        }

        const { userCollection } = this.state;
        const userCollectionList = userCollection.length ?
            userCollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>    
        ))
        :
        'No News has already collected!'    



        return (
            <div>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab='收藏列表' key='1'>
                                <div className='comment'>
                                    <Row>
                                        <Col span={24}>
                                            {userCollectionList}    
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                <TabPane tab='评论列表' key='2'></TabPane>
                <TabPane tab='头像设置' key='3'>
                                <div className='clearfix'>
                                    <Upload {...props}>
                                        <Icon type='plus' />
                                        <div className='ant-upload-text'>上传照片</div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img src={this.state.previewImage} alt=""/>
                                    </Modal>
                                </div>            
                </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>    
            
            <PCFooter />
            </div>    
        )
    }

}
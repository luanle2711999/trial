import React, { useState, Component } from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Radio,
  Button,
  DatePicker,
  Select,
  InputNumber,
} from 'antd';


export default class FormSize extends Component {
   constructor(props){
      super(props)
   }
   state = {
      componentSize : 'default',
      id : 0,
      fullName: '',
      gender: '',
      birthday: '',
      phone : '',
      key : '',
   }
   changeFullName(event){
      this.setState({
         fullName : event.target.fullName
      })
   }
   changeGender(value){
      this.setState({
         gender : value
      })
   }
   changeBirthday(date, dateString){
      this.setState({
         birthday : dateString
      })
   }
   changePhone(value){
      this.setState({
         phone : value,
      })
   }
   changeKey(event){
      this.setState({
         key : event.target.value
      })
   }
   getKey(event){
      event.preventDefault();
      this.props.remove(this.state.key);
   }
   onFormLayoutChange({size}){
      this.setState({
         componentSize : size
      })
   }
   transferData(event){
      event.preventDefault();
      const val = {
         id : this.state.id,
         fullName : this.state.fullName,
         gender : this.state.gender,
         birthday : this.state.birthday,
         phone : this.state.phone,
      }
      this.props.func(val);
      this.clearState();
   }
   clearState(){
      this.setState({
         componentSize : 'default',
         id : 0,
         fullName: '',
         gender: '',
         birthday: '',
         phone : '',
         key : '',
      })
   }
   render(){
      return(
         <>
         <h1>Student's Information</h1>
         <Form
         labelCol={{
            span: 4,
         }}
         wrapperCol={{
            span: 14,
         }}
         layout="horizontal"
         initialValues={{
            size: this.componentSize,
         }}
         onValuesChange={this.onFormLayoutChange}
         size={this.componentSize}
         >
         <Form.Item label="Student" name="size">
            <Radio.Group>
               <Radio.Button value="small">Small</Radio.Button>
               <Radio.Button value="default">Default</Radio.Button>
               <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
         </Form.Item>
         <Form.Item label="Full Name">
            <Input onChange={this.changeFullName}/>
         </Form.Item>
         <Form.Item label="Gender">
               <Select onChange={this.changeGender}>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
               </Select>
         </Form.Item>
         
         <Form.Item label="Date of Birth">
               <DatePicker onChange={this.changeBirthday} style={{width: 787}}/>
               {/* <Input onChange={changeBirthday} /> */}
         </Form.Item>
         <Form.Item label="Phone Number">
               {/* <Input onChange={changePhone}/> */}
               {/* <NumericInputDemo onChange={changePhone} style={{width: 787}} /> */}
               <InputNumber onChange={this.changePhone} style={{width: 787}}/>
            </Form.Item>
            <Form.Item label="Add Student" >
               <Button onClick={this.transferData}>Add</Button>
            </Form.Item>
            <Form.Item label="Enter Key to delete">
            <Input onChange={this.changeKey} />
         </Form.Item>
            <Form.Item label="Remove Student" >
               <Button onClick={this.getKey}>Remove</Button>
            </Form.Item>
         </Form>
      </>
      )
   }
}


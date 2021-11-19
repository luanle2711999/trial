import React, { Component } from 'react';
import { useForm } from 'react-hook-form'
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import jsonData from '../data/data.json'
// import FormSizeDemo from '../InputInfo/FormSizeDemo'
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import FormSize from '../FormSize/FromSize';




const EditableCell = ({
   editing,
   dataIndex,
   title,
   inputType,
   record,
   index,
   children,
   ...restProps
 }) => {
   const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
   return (
     <td {...restProps}>
       {editing ? (
         <Form.Item
           name={dataIndex}
           style={{
             margin: 0,
           }}
           rules={[
             {
               required: true,
               message: `Please Input ${title}!`,
             },
           ]}
         >
           {inputNode}
         </Form.Item>
       ) : (
         children
       )}
     </td>
   );
 };
 const formRef = React.createRef();
 export default class Editable extends Component { 
   state = {
      data : jsonData,
      editingKey : '',
      form : formRef.current,
   }
   isEditing = (record) => record.key === this.state.editingKey;
   edit = (record) => {
      this.state.form.setFieldsValue({
         fullName: '',
         gender: '',
         birthday: '',
         phone: '',
         ...record,
    });
    this.setState({
       editingKey : record.key,
      })
   }

   cancel = () => {
      this.setState({
         editingKey : '',
      })
  };

  save = async (key) => {
    try {
      const row = await this.state.form.validateFields();
      const newData = [...this.state.data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
      this.setState({
       data : newData,
       editingKey: '', 
    })
      } else {
        newData.push(row);
        this.setState({
           data : newData,
           editingKey : '',
        })
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

   deleteRows = () => {
      const updateStudentData = [...this.state.data];
      for(let x of updateStudentData){
            updateStudentData.pop(x);
            this.setState({
               data : updateStudentData,
            })
         }
      }
   addRows = (dataStudent) => {
      const totalStudents = this.state.data.length;
      dataStudent.id = totalStudents + 1;
      const updatedStudentData = [...this.state.data];
      updatedStudentData.push(dataStudent);
      this.setState({
         data : updatedStudentData,
      })
   }
   removeRows = (dataStudent) => {
      const updateStudentData = [...this.state.data];
      for (let x of updateStudentData){
         if(String(x.id) === dataStudent){
            updateStudentData.pop(x);
            this.setState({
               data : updateStudentData,
            })
         }
      } 
   }
   columns = [
     {
      title: 'Id', 
      dataIndex: 'id',
      width: '15%',
      editable: true,
     },
    {
      
      title: 'Full Name',
      dataIndex: 'fullName',
      width: '15%',
      editable: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '15%',
      editable: true,
    },
    {
      title: 'birthday',
      dataIndex: 'birthday',
      width: '15%',
      editable: true,
    },
    {
       title: 'Phone Number',
       dataIndex: 'phone',
       width: '15%',
       editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      with: '15%',
      render: (_, record) => {
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => this.save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={this.cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={this.state.editingKey !== ''} onClick={() => this.edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
       title: 'Delete',
       render: (_, record) =>
       this.state.data.length >= 1 ? (
         <Popconfirm title="Sure to delete?" onConfirm={this.deleteRows}>
           <a>Delete</a>
         </Popconfirm>
       ) : null,
      },
  ];
  mergedColumns = this.columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: this.isEditing(record),
      }),
    };
  });
  render() {
     return(
         <>
            <FormSize func={this.addRows} remove={this.removeRows}/>
            <Form form={this.form} component={false}>
               <Table
               components={{
                  body: {
                     cell: EditableCell,
                  },
               }}
               bordered
               dataSource={this.state.data}
               columns={this.mergedColumns}
               rowClassName="editable-row"
               pagination={{
                  onChange: this.cancel,
               }}
               />
            </Form>
         </>
     )
  };
};


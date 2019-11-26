import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
class Test extends Component {
    
      constructor(props) {
        super(props);
        this.state = {
            persons: [],
            pageCount : 1,
            lastPage:null,
            serchValue:'',
            addName:'',
            addSalary:'',
            addAge:''
        };
    
        this.firstPage = this.firstPage.bind(this);
        this.pagecountInc = this.pagecountInc.bind(this);
        this.pagecountDec = this.pagecountDec.bind(this);
        this.lastPage = this.lastPage.bind(this);
        this.searchInput = this.searchInput.bind(this);
        this.search = this.search.bind(this);
        this.add = this.add.bind(this);
        this.addName = this.addName.bind(this);
        this.addSalary = this.addSalary.bind(this);
        this.addAge = this.addAge.bind(this);
    }
    componentDidMount(){
        axios.get(`http://dummy.restapiexample.com/api/v1/employees`)
        .then(res => {
          const persons = res.data;
          this.setState({ persons });
        })
    }
    firstPage(){
        this.setState({
            pageCount:1
        })
    }
    searchInput(e){
        this.setState({serchValue:e.target.value})
    }
    search(){
        var find=false; 
        {this.state.persons.map(person=>{
            // console.log(person.employee_name)
            if(person.employee_name===this.state.serchValue){
                find=true
            }
        })} 
        if(find){
            console.log("user exist")
        }
        else
        console.log("user not exist")
    }
    pagecountInc(){
        let pageCount=this.state.pageCount
        this.setState({
            pageCount:pageCount+1
        })
    }
    pagecountDec(){
       let pageCount=this.state.pageCount
        this.setState({
            pageCount:pageCount-1
        })
    }
    lastPage(){
        var size=this.state.persons.length;
      if(size%10===0)
         var lastPage=size/10;
      else
         var lastPage=parseInt(size/10)+1;
        this.setState({
            pageCount:lastPage,
            lastPage:lastPage
        })
    }
    add(){
        console.log(this.state)
        // its not working
        axios({
            method: 'post',
            url: `http://dummy.restapiexample.com/api/v1/employees`,
            data: {
                name: this.state.addName,
                salary: this.state.addSalary,
                age: this.state.addAge,
            },
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
                "Access-Control-Allow-Origin": "*",
            },
        }).then(function (res) {
            const persons = res.data;
            console.log(persons)
        }).catch(function (error) {
            console.log("Error::::",error);
        });
    }
    addName(e){
        this.setState({addName:e.target.value})
    }
    addSalary(e){
        this.setState({addSalary:e.target.value})
    }
    addAge(e){
        this.setState({addAge:e.target.value})
    }
    render() { 
        return (
            <div>
                <div className="search">
                    <input type="text" placeholder="enter a employee name" onChange={(e)=>this.searchInput(e)}></input>
                    <button type="button" onClick={this.search}>search</button>
                </div>
                <div className="search">
                    <input type="text" placeholder="enter employee name" onChange={(e)=>this.addName(e)}></input>
                </div>
                <div className="search">   
                    <input type="text" placeholder="enter employee salary" onChange={(e)=>this.addSalary(e)}></input>
                </div>
                <div className="search">    
                    <input type="text" placeholder="enter employee age" onChange={(e)=>this.addAge(e)}></input>
                    <button type="button" onClick={this.add}>Add</button>
                </div>
                <div className="pagination">
                    <button type="button" disabled={this.state.pageCount===1} className={this.state.pageCount===1?"fullList":null} onClick={this.firstPage}> <i>first</i>  </button>
                    <button type="button" disabled={this.state.pageCount===1} className={this.state.pageCount===1?"fullList":null} onClick={this.pagecountDec}>  <FontAwesomeIcon icon={faAngleLeft} /> </button>
                    <button type="button" className="fullList" disabled={this.state.pageCount} href="#"> <i>{this.state.pageCount}</i> </button>
                    <button type="button"  disabled={this.state.lastPage===this.state.pageCount} className={this.state.pageCount===this.state.lastPage?"fullList":null} onClick={this.pagecountInc}><FontAwesomeIcon icon={faAngleRight}/>  </button>
                    <button type="button"  disabled={this.state.lastPage===this.state.pageCount} className={this.state.pageCount===this.state.lastPage?"fullList":null} onClick={this.lastPage}> <i>last </i> </button>
                </div>
                <div className="list">
                    <table >
                        <tbody>
                            <tr>
                                <th> employee_name </th>
                                <th> employee_salary </th>
                                <th> employee_age</th>
                            </tr>
                            { this.state.persons.slice((this.state.pageCount*10)-10,this.state.pageCount*10).map(person => 
                            <tr key={person.id}>
                                <td >{person.employee_name}</td>
                                <td >{person.employee_salary}</td>
                                <td >{person.employee_age}</td>
                            </tr>
                            )} 
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Test;
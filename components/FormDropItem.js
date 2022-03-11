import React, {useState} from 'react';
import navStyles from '../styles/Nav.module.css'


// create div for icons

function FormDropItem (props){
    const [dropItem, setItem] = useState([1])
    //
    const Row = function(props){
        const {checked, value, onChange, onChecked} = props;
        return (
          <div>
            <input 
              type="checkbox" 
              checked={checked}
              onChange={onChecked}
              />
            <input type ="text" value={value}  onChange={onChange}/>
          </div>
        );
      }

    //
    return (
     <li className={navStyles.menu}>
       <a className={navStyles.icon_button} onClick={()=> setItem(dropItem.push(2))}>
         {props.icon}
  
         {dropItem && props.children}
       </a>
     </li>
    )
}

export default FormDropItem;

/*
    vanilla js
        var elem = document.getElementById("button_" + id);
        elem.parentNode.removeChild(elem);

const Row = function(props){
  const {checked, value, onChange, onChecked} = props;
  return (
    <div>
      <input 
        type="checkbox" 
        checked={checked}
        onChange={onChecked}
        />
      <input type ="text" value={value}  onChange={onChange}/>
    </div>
  );
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rows: [
        {value: 'row1', checked: false},
        {value: 'row2', checked: true},
        {value: 'row3', checked: false},
      ]
    };
  }
  
  updateValue = (e, idx) => {
    const rows = [...this.state.rows];  // copy array because we don't want to mutate the previous one
    rows[idx].value = e.target.value;
    this.setState({
        rows,
    });
  }
  
  onChecked = (idx) => {
    const rows = [...this.state.rows];  // copy array because we don't want to mutate the previous one
    rows[idx].checked = !rows[idx].checked;
    this.setState({
        rows,
    });
  } 
  
  addRow = () => {
    const rows = [...this.state.rows, 
                  {value:'', checked: false}
                 ];
    this.setState({
        rows,
    });
  }
  
  deleteRows = () => {
    this.setState({
      rows: this.state.rows.filter(e => !e.checked)
    });
  }
 
  render(){
    return(
      <div>
        {this.state.rows.map((row, idx) => {
          return(
              <Row 
                key={idx} 
                value={row.value}
                checked={row.checked}
                onChange={(e) => this.updateValue(e, idx)} 
                onChecked={() => this.onChecked(idx)}
                /> 
            )
        })
        }
        <button onClick={this.addRow}>
          add 
        </button>
        <button onClick={this.deleteRows}>
          delete
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

--- ---- ----

var List = React.createClass({
  getInitialState: function () {
    return { deleted: [] };
  },

  onDelete: function (id) {
    this.setState({ deleted: this.state.deleted.concat([id]) });
  },

  render: function() {
    var Items = this.props.data
      .filter(item => this.state.deleted.indexOf(item.id) === -1)
      .map(item => {
        return (
          <Item key={item.id} id={item.id} onDelete={id => this.onDelete(id)}>
            {item.text}
          </Item>
        );
      });

    return (
      <div className="items">
        {Items}
      </div>
    );
  }
});

var Item = React.createClass({
  render: function() {
    return (
      <div className="item">
          {this.props.children}
          <button className="delete" onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
      </div>
    );
  }
});

ReactDOM.render(
  <List data={Array of items} />,
  document.getElementById('content')
);
*/
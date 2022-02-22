import axios from 'axios';
 
import React,{Component} from 'react';

 
class App extends Component {
  
   
  state = {      
    selectedFile: null,
    nombre: "",
    descripcion:"",
    datos:null,
    message: "",
    items: []
  };
    
 
    constructor(props) {      
      super(props);                            
      this.actualizar();
    }
    
    /**Actualización de datos de la tabla de productos */
     actualizar=event =>{
      axios.get("https://localhost:44348/api/Producto").then(response => {
        this.setState({
          items: response.data
        });                                                  
      } , (error) => {
        console.log(error);
      });

    }

    /**Inicio formulario */
     
    onFileChange = event => {    
      this.setState({ selectedFile: event.target.files[0] });
    
    };

    updateNombre(event) {
      this.setState({
        nombre: event.target.value
      });
    }
    updateDescripcion(event) {
      this.setState({
        descripcion: event.target.value
      });
    }
    
    /**Cargue del producto */
     onFileUpload =async () => {    
      const formData = new FormData();
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
   

      axios.post("https://localhost:44348/api/Producto/CrearProducto?nombre="+this.state.nombre+"&descripcion="+this.state.descripcion+"", formData).then(response => {
        console.log(response.data);
        console.log(response.data.ideImagen);
        alert(response.data);               
        this.actualizar();
      } , (error) => {
        console.log(error);
      });
    };
    
    

    fileData = () => {    
      if (this.state.selectedFile) {         
        return (
          <div>
            <h2>Detalles:</h2>             
            <p>Nombre: {this.state.selectedFile.name}</p>                                    
            <p>Tipo: {this.state.selectedFile.type}</p>                                    
            <p>
              Ultima modificación:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
 
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };

    /**Fin formulario */


    /***Inicio tabla */
    updateMessage(event) {
      this.setState({
        message: event.target.value
      });
    }
  
    handleClick() {
      var items = this.state.items;
  
      items.push(this.state.message);
  
      this.setState({
        items: items,
        message: ""
      });
    }
  
    handleNombreCambiado(o, event) {          
     axios.post("https://localhost:44348/api/Producto/ActualizarNombre?ideProducto="+o.ideProducto+"&nombre="+ event.target.value).then(response => {
      console.log(response.data);        
      this.actualizar();
    //  alert("Actualizado satisfactoriamente!");
    } , (error) => {
      console.log(error);
    }); 
    }

    handleDescripcionCambiada(o, event) {          
      axios.post("https://localhost:44348/api/Producto/ActualizarNombre?ideProducto="+o.ideProducto+"&nombre="+ event.target.value).then(response => {
       console.log(response.data);        
       this.actualizar();
      // alert("Actualizado satisfactoriamente!");
     } , (error) => {
       console.log(error);
     }); 
     }
  
    handleItemDeleted(o) {      
      axios.post("https://localhost:44348/api/Producto/ActualizarDescripcion?ideProducto="+o.ideProducto+"").then(response => {
        console.log(response.data);        
        this.actualizar();
        alert("Eliminado satisfactoriamente!");
      } , (error) => {
        console.log(error);
      });
     
    }

    urlFetch(data) {
      fetch(data, { 
      headers: new Headers({
      'authorization': `Bearer ${this.props.token}`, 
      'Content-Type': 'application/json'
      })
     })
     .then(response => {
      if (response.statusText === 'OK') {
       return data   // OR return response.url
       }
      })
     }
  


    renderRows() {
      var context = this;

     
  
      return  this.state.items.map(function(o, i) {
                return (
                  <tr key={"item-" + i}>
                    <td>
                      <input id={"n-" + i}
                        type="text"
                        value={o.nombre}
                        onChange={context.handleNombreCambiado.bind(context, o)}
                      />
                    </td>
                    <td>
                    <input id={"d-" + i}
                        type="text"
                        value={o.descripcion}
                        onChange={context.handleDescripcionCambiada.bind(context, o)}
                      />
                    </td>
                    <td>
                    <img
                      src=""
                      width={20}
                      alt='@Todo agregar el base 64'
                    />

                    </td>
                    <td>
                      <button
                        onClick={context.handleItemDeleted.bind(context, o)}
                      > Delete
                      </button>
                    </td>
                  </tr>
                );
              });
    }
    
/**Fin tabla */

    render() {
    
      return (
        <div className="container-div">
           <div className='centrado'> <h1>
              Almacen
            </h1>
            <h3>
              Creación de productos
            </h3>
            <div>
                <label>
                  Nombre
                <input type="text" value={this.state.nombre} onChange={this.updateNombre.bind(this)}/>
                </label>
                <label>
                  Descripción
                  <input type="text" value={this.state.descripcion} onChange={this.updateDescripcion.bind(this)}/>
                  </label>
                
                <input type="file" onChange={this.onFileChange} accept="image/png, image/gif, image/jpeg" />
                <button onClick={this.onFileUpload}>
                  Crear!
                </button>
            </div>
            
          {this.fileData()}



          <table className="">
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Descripción
              </th>
              <th>
                Imagen
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        </div>
        </div>


      );
    }
  }
 
  export default App;
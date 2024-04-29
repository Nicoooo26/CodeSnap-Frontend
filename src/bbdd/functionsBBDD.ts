export const createUser = (username:string,email:string,password:string) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.response);
        }
    };
    xhttp.open("POST","http://localhost/DWES/BackendCodeSnap/user",true);//false = síncrona ; true = asíncrona
    //Nuestra API recibe los datos en "crudo", con lo que se envia el texto sin cabecera de formulario
    xhttp.send('{"username": "'+username+'","email": "'+email+'","password": "'+password+'"}');
}
function Pokemon(n,o,v,a,t)
{
    this.nombre = n;
    this.numero = o;
    this.vida = v;
    this.ataque = a;
	this.tipo = t;
}

function inicio()
{
	//Foliat
    var foliat = new Pokemon("Foliat",1,40, 20,"Hierba");
    foliat_nombre.textContent = foliat.nombre;
    foliat_numero.textContent = foliat.numero;
    foliat_vida.textContent = foliat.vida;
    foliat_ataque.textContent = foliat.ataque;
    foliat_tipo.textContent = foliat.tipo;
    foliat_imagen.innerHTML= "<img src='images/pokemon_"+foliat.numero+".jpg'>";
}
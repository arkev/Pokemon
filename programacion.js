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
    var foliat = new Pokemon("Foliat",1,100, 20,"Hierba");
    foliat_nombre.textContent = foliat.nombre;
    foliat_numero.textContent = foliat.numero;
    foliat_vida.textContent = foliat.vida;
    foliat_ataque.textContent = foliat.ataque;
    foliat_tipo.textContent = foliat.tipo;
    foliat_imagen.innerHTML= "<img src='images/pokemon_"+foliat.numero+".jpg'>";
    
    //florabri
    var florabri = new Pokemon("florabri",2,110, 40,"Hierba, Aéreo");
    florabri_nombre.textContent = florabri.nombre;
    florabri_numero.textContent = florabri.numero;
    florabri_vida.textContent =   florabri.vida;
    florabri_ataque.textContent = florabri.ataque;
    florabri_tipo.textContent =   florabri.tipo;
    florabri_imagen.innerHTML= "<img src='images/pokemon_"+florabri.numero+".jpg'>";
    
    //Florresum
    var florresum = new Pokemon("Florresum",3,130, 60,"Hierba, Aéreo");
    florresum_nombre.textContent = 	florresum.nombre;
    florresum_numero.textContent = 	florresum.numero;
    florresum_vida.textContent = 	florresum.vida;
    florresum_ataque.textContent = 	florresum.ataque;
    florresum_tipo.textContent = 	florresum.tipo;
    florresum_imagen.innerHTML= "<img src='images/pokemon_"+florresum.numero+".jpg'>";
    
    //kidling
    var kidling = new Pokemon("Kidling",4,150, 40,"Fuego");
    kidling_nombre.textContent = kidling.nombre;
    kidling_numero.textContent = kidling.numero;
    kidling_vida.textContent =   kidling.vida;
    kidling_ataque.textContent = kidling.ataque;
    kidling_tipo.textContent =   kidling.tipo;
    kidling_imagen.innerHTML= "<img src='images/pokemon_"+kidling.numero+".jpg'>";
    
    //pyroat
    var foliat = new Pokemon("Pyroat",5,160, 60,"Fuego, Roca");
    pyroat_nombre.textContent = pyroat.nombre;
    pyroat_numero.textContent = pyroat.numero;
    pyroat_vida.textContent =   pyroat.vida;
    pyroat_ataque.textContent = pyroat.ataque;
    pyroat_tipo.textContent =   pyroat.tipo;
    pyroat_imagen.innerHTML= "<img src='images/pokemon_"+pyroat.numero+".jpg'>";
    
    //flairees
    var foliat = new Pokemon("Flairees",6,180, 90,"Hierba");
    flairees_nombre.textContent = flairees.nombre;
    flairees_numero.textContent = flairees.numero;
    flairees_vida.textContent =   flairees.vida;
    flairees_ataque.textContent = flairees.ataque;
    flairees_tipo.textContent =   flairees.tipo;
    flairees_imagen.innerHTML= "<img src='images/pokemon_"+flairees.numero+".jpg'>";
    
    //aguade
    var foliat = new Pokemon("Aguade",7,150, 25,"Agua");
    aguade_nombre.textContent = aguade.nombre;
    aguade_numero.textContent = aguade.numero;
    aguade_vida.textContent =   aguade.vida;
    aguade_ataque.textContent = aguade.ataque;
    aguade_tipo.textContent =   aguade.tipo;
    aguade_imagen.innerHTML= "<img src='images/pokemon_"+aguade.numero+".jpg'>";
    
    //iguadium
    var iguadium = new Pokemon("Iguadium",8,180, 80,"Agua, Lucha");
    iguadium_nombre.textContent = iguadium.nombre;
    iguadium_numero.textContent = iguadium.numero;
    iguadium_vida.textContent =   iguadium.vida;
    iguadium_ataque.textContent = iguadium.ataque;
    iguadium_tipo.textContent =   iguadium.tipo;
    iguadium_imagen.innerHTML= "<img src='images/pokemon_"+iguadium.numero+".jpg'>";
    
    //aguanaut
    var aguanaut = new Pokemon("Aguanaut",9,250, 100,"Agua, Lucha");
    aguanaut_nombre.textContent = aguanaut.nombre;
    aguanaut_numero.textContent = aguanaut.numero;
    aguanaut_vida.textContent =   aguanaut.vida;
    aguanaut_ataque.textContent = aguanaut.ataque;
    aguanaut_tipo.textContent =   aguanaut.tipo;
    aguanaut_imagen.innerHTML= "<img src='images/pokemon_"+aguanaut.numero+".jpg'>";
    
    
    //harpee
    var harpee = new Pokemon("Harpee",10,100, 20,"Normal, Aéreo");
    harpee_nombre.textContent = harpee.nombre;
    harpee_numero.textContent = harpee.numero;
    harpee_vida.textContent =   harpee.vida;
    harpee_ataque.textContent = harpee.ataque;
    harpee_tipo.textContent =   harpee.tipo;
    harpee_imagen.innerHTML= "<img src='images/pokemon_"+harpee.numero+".jpg'>";
    
    //aquilor
    var aquilor = new Pokemon("aquilor",11,120, 40,"Normal, Aéreo");
    aquilor_nombre.textContent = aquilor.nombre;
    aquilor_numero.textContent = aquilor.numero;
    aquilor_vida.textContent =   aquilor.vida;
    aquilor_ataque.textContent = aquilor.ataque;
    aquilor_tipo.textContent =   aquilor.tipo;
    aquilor_imagen.innerHTML= "<img src='images/pokemon_"+aquilor.numero+".jpg'>";
}
let n = 0;
document.getElementById("table_ordinal").innerHTML = n;
m = 0;
primes = "";

function insertnumber() {
    document.getElementById("n1").innerHTML = document.getElementById("n1_input").value;
    document.getElementById("n2").innerHTML = document.getElementById("n2_input").value;
    lcmgcd();
}

function move(r)  {
    if (r == -1)    {
        n--;
    }
    else if (r == 1)    {
        n++;
    } else {
        n = n;
    }
    document.getElementById("table_ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function enter()    {
    n = document.getElementById("input").value;
    if (n == "")    {
        n = 0;
    }
    
    document.getElementById("table_ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function reset()    {
    n = 0;
    if (n == 0) {
        let previousbtn = document.getElementById("previous");
        previousbtn.style.visibility = 'hidden';
    }
    document.getElementById("table_ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function random()    {
    n = Math.floor(Math.random()* (10000 - 0));
    
    document.getElementById("table_ordinal").innerHTML = "<font face=helvetica>Grid #" + n + "</font>";
    creategrid();
}

function creategrid()    {
    let table = "";
    let list = "";
    let p = "0";
    let prime = [];
    m = n * 100 + 1;
    if (n != 0) {
        let previousbtn = document.getElementById("previous");
        previousbtn.style.visibility = 'visible';
    } else  {
        let previousbtn = document.getElementById("previous");
        previousbtn.style.visibility = 'hidden';
    }
    for (let i = 0; i < 10; i++)    {
        for (let i = 0; i < 10; i++)    {
            let primefact = [];
            let h = 2;
            let g = m;
        
            while (h**2 <= g)   {
                if (g % h == 0) {
                    primefact.push(h);
                    g = g / h;
                } else {
                    h += 1;
                }
            }
            if (g > 1) {
                primefact.push(g);
            }

            if (primefact.includes(m) == false)    {
                list += "<td class=notprime onclick=number(" + m + ") style=font-size:23px;><font face=helvetica>" + m + "</font></td>";
                m = m + 1;
            } else if (m == 1)   {
                list += "<td class=notprime onclick=number(" + m + ") style=font-size:23px;><font face=helvetica>" + m + "</font></td>";
                m = m + 1;
            } else {
                list += "<td class=prime onclick=number(" + m + ") onclick=document.getElementById(desc).style.display = block><b><font face=helvetica>" + m + "</font></b></td>";
                prime.push(m);
                m = m + 1;
                p++;
            }
        }
        table += "<tr>" + list + "</tr>";
        list = "";
    }
    document.getElementById("grid").innerHTML = table;
    document.getElementById("numberofprimes").innerHTML = "There are <b>" + p + " prime numbers</b> in this 10x10 grid";
    primes = prime.join(" ");
}

function number(x)   {
    document.getElementById("desc").style.display = "block";
    document.getElementById("desc_ordinal").innerHTML = "Card #" + x;

    let f = 1;
    let g = x;
    m = x;
    const factors = [];
    const primefact = [];
    do  { // factors
        if (x % f == 0) { 
            factors.push(f);
            f++;
        } else{
            f++;
        }
    }
    while (f <= x);
    let h = 2;
    while (h**2 <= g)   { // primefact
        if (g % h == 0) {
            primefact.push(h);
            g = g / h;
        } else {
            h += 1;
        }
    }
    if (g > 1) {
        primefact.push(g);
    }

    document.getElementById("table").style.display = "none";
    document.getElementById("n").innerHTML = x;
    if (primes.includes(x) == true && x != 1 && x != 4 && x != 6 && x != 8 && x != 9) {
        document.getElementById("n").style.backgroundColor = "Red";
        document.getElementById("n").style.color = "White";
        document.getElementById("n").style.fontWeight = "Bold";
        document.getElementById("numbertype").innerHTML = "<b>Number:</b> Prime";
        document.getElementById("factors").innerHTML = "<b>Factors: </b>" + factors.join(", ") + " (" + factors.length + " factors)"; 
        document.getElementById("primefactors").innerHTML = "<b>Prime Factors: </b>" + primefact.join(" * ");
        document.getElementById("numbertype").style.backgroundColor = "Silver";
        document.getElementById("factors").style.display = "block";
        document.getElementById("primefactors").style.display = "block"; 
    } else if (x == 1)  {
        document.getElementById("n").style.backgroundColor = "White";
        document.getElementById("n").style.color = "Black";
        document.getElementById("n").style.fontWeight = 400;
        document.getElementById("numbertype").innerHTML = "The number 1 is neither a prime number nor a composite number because it doesnt satisfy the definitions of both categories. Prime numbers have exactly two distinct factors (which is 1 and itself), while composite numbers are greater than 1 and can be factored into smaller integers. Since 1 doesnt fit in these definitions, it falls outside the prime and composite classifications."
        document.getElementById("numbertype").style.backgroundColor = "White";
        document.getElementById("factors").style.display = "none";
        document.getElementById("primefactors").style.display = "none";
    } else  {
        document.getElementById("n").style.backgroundColor = "White";
        document.getElementById("n").style.color = "Black";
        document.getElementById("n").style.fontWeight = 400;
        document.getElementById("numbertype").innerHTML = "<b>Number:</b> Composite";
        document.getElementById("factors").innerHTML = "<b>Factors: </b>" + factors.join(", ") + " (" + factors.length + " factors)"; 
        document.getElementById("primefactors").innerHTML = "<b>Prime Factors: </b>" + primefact.join(" * "); 
        document.getElementById("numbertype").style.backgroundColor = "Silver";
        document.getElementById("factors").style.display = "block";
        document.getElementById("primefactors").style.display = "block";
    }
}

function back() {
    document.getElementById("desc").style.display = "none";
    document.getElementById("lcm").style.display = "none";
    document.getElementById("table").style.display = "block";
    creategrid();
}

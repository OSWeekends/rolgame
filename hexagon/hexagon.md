# Dibujar un hexágono en SVG

Un hexágono regular es un polígono de seis lados cuyos vértices son equidistantes entre sí, y equidistantes respecto al centro del círculo en en cual se inscribe.

Por tanto, podemos generar un hexágono en SVG usando la tag `<polygon>` e introduciendo las coordenadas de cada uno de los seis vértices.

```html
<polygon points="x1,y1 x2,y2 ..." />
```

Para obtener las coordenadas de los vertices, tenemos que tener en cuenta dos cosas:

- que los ejes x e y, en SVG, tienen como origen de coordenadas la esquina superior izquierda, donde `x` crece de izquierda a derecha, e `y` crece de arriba a abajo (contrariamente esto último al plano de coordenadas cartesianas habitual). 

- que las coordenadas de cada vértice han de expresarse en este plano cartesiano como `(x,y)`.

![Hexagon](./hexagon1.svg)

Sin embargo, para obtener un hexágono regular tenemos que partir de un círculo en el cual dibujaremos los vértices equiespaciados por 60º, que es la sexta parte de los 360º de la circunferencia. Rotaremos 30º nuestro polígono para que haya vértices arriba y abajo, y lados a izquierda y derecha. Con lo cual, y en coordenadas polares, podemos usar la siguiente ecuación para obtener las coordenadas de cada vértice:

```
ρ<sub>z</sub>(R,θ)=(100, 60z - 30)
```

Y convertimos de polares a cartesianas mediante la fórmula:

```
v<sub>z</sub>(x,y)=(Rcos(θ<sub>z</sub>),Rsen(θ<sub>z</sub>))
```

Es decir:

$ρ_1(R,θ)=(100, 30)=>v_1(x,y)=(86.6, 50)$

$ρ_2(R,θ)=(100, 90)=>v_2(x,y)=(0, 100)$

$ρ_3(R,θ)=(100, 150)=>v_3(x,y)=(-86.6, 50)$

$ρ_4(R,θ)=(100, 210)=>v_4(x,y)=(-86.6, -50)$

$ρ_5(R,θ)=(100, 270)=>v_5(x,y)=(0, -100)$

$ρ_6(R,θ)=(100, 330)=>v_6(x,y)=(86.6, -50)$

Ya tenemos todas las coordenadas de los vértices, suponiendo que el centro del hexágono es nuestro origen de coordenadas.

![Hexagon](./hexagon2.svg)

Pero si dibujamos el polígono sin más, nos encontraremos con que el origen de coordenadas del hexágono coincidirá con el del propio SVG. Por tanto, para poder visualizar el hexágono completo, necesitaremos hacer una translación.

Entonces, el SVG que generará nuestro hexágono será el siguiente:

```html
<svg version="1.1" width="200" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <polygon points="86.6,50 0,100 -86.6,50 -86.6,-50 0,-100 86.6,-50" transform="translate(100 100)" />
</svg>
```

En los SVGs incrustados en este documento, hemos optado por agrupar todo bajo una tag `<g>` y aplicar la translación al grupo completo, evitando tener que hacerlo con cada elemento individual y obteniendo el mismo resultado.

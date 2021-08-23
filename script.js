const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = innerWidth;
const height = canvas.height = innerHeight;

class Field{
	constructor(){
		this.rings = [],
		this.lineWidth = 10,
		this.startAngle = 0,
		this.ringRadius = 200,
		this.waveOffset = 15,
		this.numberOfWaves = 7,
		this.numberOfRings = 3,
		this.arrayColorRing = ['#11ff22', '#119922', '#117722'],
		this.ringRadiusOffset = 7,
		this.maxWaveAmplitude = 20
	}
	addRings(){
		for(let i = 0; i < this.numberOfRings; i++){
			this.rings.push(new Ring({
				color: this.arrayColorRing[i],
				radius: this.ringRadius + i * this.ringRadiusOffset,
				lineWidth: this.lineWidth,
				maxWaveAmplitude: this.maxWaveAmplitude,
				numberOfWaves: this.numberOfWaves,
				offsetAngle: i * this.waveOffset * Math.PI / 180
			}))
		}
	}
	ringDraw(){
		for(let i = 0; i < this.rings.length; i++){
			this.rings[i].draw(field);
		}

		this.startAngle >= 360 ? this.startAngle = 0 : this.startAngle++;
	}
}

class Ring{
	constructor(options){
		this.x = width / 2,
		this.y = height / 2,
		this.color = options.color,
		this.radius = options.radius,
		this.lineWidth = options.lineWidth
		this.waveAmplitude,
		this.maxWaveAmplitude = options.maxWaveAmplitude,
		this.numberOfWaves = options.numberOfWaves,
		this.offsetAngle = options.offsetAngle,
		this.displacement = 0
	}
	draw(field){
		ctx.beginPath();
			for(let i = -180; i <= 180; i++){
				let currentAngle = (i + field.startAngle) * Math.PI / 180;
				let now = Math.abs(i);

				now > 70 ? this.displacement = (now - 70) / 70 : this.displacement = 0;

				if(this.displacement >= 1) this.displacement = 1;

				this.waveAmplitude = Math.sin((currentAngle + this.offsetAngle) * this.numberOfWaves) 
									* this.displacement * this.maxWaveAmplitude;
				let x = this.x + (this.radius + this.waveAmplitude) * Math.cos(currentAngle);
				let y = this.y + (this.radius + this.waveAmplitude) * Math.sin(currentAngle);
				
				i >= -180 ? ctx.lineTo(x, y) : ctx.moveTo(this.x + this.radius, this.y);
			}
			ctx.lineWidth = this.lineWidth;
			ctx.strokeStyle = this.color;
			ctx.stroke();
		ctx.closePath();
	}
}

const field = new Field();
field.addRings();

loop = () => {
	ctx.clearRect(0, 0, width, height);
	field.ringDraw();
	requestAnimationFrame(loop);
}
loop();
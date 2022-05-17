export default class Item{
	constructor({id = null, name, qty, shortdesc, longdesc, city}){
		this.id = id;
		this.name = name;
		this.qty = qty;
		this.shortdesc = shortdesc;
		this.longdesc = longdesc;
		this.city = city;
	}
}

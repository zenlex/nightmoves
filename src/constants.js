//INVENTORY TABLE
export const INV_TABLE_NAME = 'inventory';
export const INV_ALL_COLUMNS =['id', 'qty', 'name', 'shortdesc', 'longdesc', 'city'].join(',');
export const INV_COLUMNS_NOID = ['qty', 'name', 'shortdesc', 'longdesc', 'city'].join(',');

//SHIPMENT TABLE
export const SHIP_TABLE_NAME = 'shipments';
export const SHIP_ALL_COLUMNS = ['id', 'destination', 'custname', 'items'].join();
export const SHIP_COLUMNS_NOID = ['destination', 'custname', 'items'].join();
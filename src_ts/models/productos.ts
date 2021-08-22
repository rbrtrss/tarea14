class Productos {
  productos: {id: string, title: string, price: number, thumbnail: string}[]
  insideId: number
  constructor() {
    this.productos = [];
    this.insideId = 0;
  }

  showProductos() {
    if (this.productos.length === 0) {
      return { productosExisten: false, error: 'No hay productos cargados' };
    }
    return { productosExisten: true, productos: this.productos };
  }

  addProducto(title: string, price: number, thumbnail: string) {
    this.insideId += 1;
    const producto = {
      id: String(this.insideId),
      title: title,
      price: price,
      thumbnail: thumbnail,
    };
    this.productos.push(producto);
    return producto;
  }

  showUnProducto(id: string) {
    const producto = this.productos.find(
      (elemento) => elemento.id === id
    );
    if (producto === undefined) {
      return { error: 'Producto no encontrado' };
    }
    return producto;
  }

  modifyProducto(id: string, newTitle: string, newPrice: number, newThumbnail: string) {
    const producto = this.productos.find(
      (elemento) => elemento.id === id
    );
    if (producto === undefined) {
      return { error: 'Producto no encontrado' };
    }
    producto.title = newTitle;
    producto.price = newPrice;
    producto.thumbnail = newThumbnail;
    return producto;
  }

  deleteProducto(id: string) {
    const arrayIndex = this.productos.findIndex(
      (elemento) => elemento.id === id
    );
    if (arrayIndex === -1) {
      return { error: 'Producto no encontrado' };
    }
    this.productos.splice(arrayIndex, 1);
    return this.productos;
  }
}

export default new Productos();

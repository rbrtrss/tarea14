class Usuarios {
  usuarios: {id: string, email: string}[]
  constructor() {
    this.usuarios = [];
  }

  showUsuarios() {
    if (this.usuarios.length === 0) {
      return {
        usuariosExisten: false,
        error: 'No existen usuarios en el chat',
      };
    }
    return { productosExisten: true, usuarios: this.usuarios };
  }

  addUsuario(id: string, email: string) {
    const usuario = {
      id: id,
      email: email,
    };
    this.usuarios.push(usuario);
    return usuario;
  }

  getUsuario(id: string) {
    const lookup = this.usuarios.find((usuario) => usuario.id === id);
    if (lookup === undefined) {
      throw new Error(`No hay usuarios con este id: ${id}`)
    }
    else {
      return lookup
    }
  }
}

export default new Usuarios();

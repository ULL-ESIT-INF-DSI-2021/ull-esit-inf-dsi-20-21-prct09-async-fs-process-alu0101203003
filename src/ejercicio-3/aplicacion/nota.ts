/**
 * Clase Nota.
 * Almacena las propiedades de una nota
 */
export class Nota {
    /**
     * Constructor
     * @param titulo titulo de la nota
     * @param cuerpo cuerpo de la nota
     * @param color color de la nota
     */ 
    constructor(private titulo :string, private cuerpo :string, private color :string) {}

    /**
     * Funcion getTitulo
     * @returns titulo
     */
    public getTitulo(){
       return this.titulo
    }   

    /**
     * Funcion setTitulo
     * @param titulo a asignar
     */
     public setTitulo(titulo :string){
        this.titulo = titulo
     }   

    /**
     * Funcion getCuerpo
     * @returns cuerpo
     */
     public getCuerpo(){
        return this.cuerpo
     }  

    /**
     * Funcion setCuerpo
     * @param cuerpo a asignar
     */
     public setCuerpo(cuerpo :string){
        this.cuerpo = cuerpo
     }   


    /**
     * Funcion getColor
     * @returns color
     */
     public getColor(){
        return this.color
     }  

    /**
     * Funcion setColor
     * @param color a asignar
     */
     public setColor(color :string){
        this.color = color
     } 
     
     /**
     * Funcion formatear.
     * Cambia la nota al formato JSON
     */
      public formatear(){
        return `{\n\t"titulo": "${this.titulo}",\n\t"cuerpo": "${this.cuerpo}",\n\t"color": "${this.color}"\n}`
     } 
}
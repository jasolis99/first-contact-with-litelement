export const TextTransform = (superClass) => {
    class TextTransformMethods extends superClass{

        // eslint-disable-next-line class-methods-use-this
        transformToUpperCase(title){
            return title.toUpperCase()
        }
    }
    return TextTransformMethods
}
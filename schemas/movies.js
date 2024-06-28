const z = require("zod")

const moviesSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is require'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5.5),
    poster: z.string().url({
        msg: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action', "Crime", "Drama", "Adventure", "Sci-Fi", "Romance", "Animation", "Biography", "Fantasy", 'Horror', 'Thriller'])
        )
})

const validatePartialMovie = input =>{
    return moviesSchema.partial().safeParse(input)
}

const validateObject = input =>{
    return moviesSchema.safeParse(input)
}

module.exports = {validateObject, validatePartialMovie}
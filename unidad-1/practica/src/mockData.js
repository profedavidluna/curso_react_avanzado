export const initialBooks = [
  {
    id: "b1",
    title: "Cien años de soledad",
    authorId: "a1",
    categoryId: "c1",
    isbn: "978-0307474728",
    pages: 496,
    year: 1967,
    summary: "La novela narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo, combinando fantasía y realidad histórica.",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    reviews: [
      { id: "r1", user: "Ana Gómez", rating: 5, comment: "Una obra maestra indiscutible del realismo mágico. De lectura obligatoria." },
      { id: "r2", user: "Carlos Ruiz", rating: 4, comment: "Excelente prosa, aunque a veces resulta confuso recordar todos los Aurelianos." }
    ],
    loans: [
      { id: "l1", user: "María López", startDate: "2026-04-10", endDate: "2026-04-24", status: "returned" },
      { id: "l2", user: "Juan Pérez", startDate: "2026-05-01", endDate: "2026-05-15", status: "active" }
    ]
  },
  {
    id: "b2",
    title: "El amor en los tiempos del cólera",
    authorId: "a1",
    categoryId: "c1",
    isbn: "978-0307387264",
    pages: 368,
    year: 1985,
    summary: "Una historia de amor inquebrantable que sobrevive más de cincuenta años entre Florentino Ariza y Fermina Daza, ambientada en el Caribe colombiano.",
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
    reviews: [
      { id: "r3", user: "Sofía Medina", rating: 5, comment: "Una de las historias de amor más bellas que se han escrito. Gabriel García Márquez en su esplendor." }
    ],
    loans: [
      { id: "l3", user: "Pedro Castro", startDate: "2026-03-15", endDate: "2026-03-29", status: "returned" }
    ]
  },
  {
    id: "b3",
    title: "El código Da Vinci",
    authorId: "a2",
    categoryId: "c2",
    isbn: "978-0307474278",
    pages: 560,
    year: 2003,
    summary: "El catedrático de Simbología Robert Langdon y la criptóloga Sophie Neveu se ven envueltos en la búsqueda del Santo Grial tras un misterioso asesinato en el Louvre.",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    reviews: [
      { id: "r4", user: "David León", rating: 3, comment: "Entretenido y rápido de leer, pero con muchas imprecisiones históricas." },
      { id: "r5", user: "Elena S.", rating: 4, comment: "Un thriller vertiginoso que te mantiene enganchado de principio a fin." }
    ],
    loans: [
      { id: "l4", user: "Lucía Fernández", startDate: "2026-05-10", endDate: "2026-05-24", status: "active" }
    ]
  },
  {
    id: "b4",
    title: "Ángeles y demonios",
    authorId: "a2",
    categoryId: "c2",
    isbn: "978-0307474261",
    pages: 608,
    year: 2000,
    summary: "Robert Langdon viaja a Roma para investigar a los Illuminati, una antigua secta satánica, que planea destruir la Ciudad del Vaticano usando antimateria.",
    coverUrl: "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=400&q=80",
    reviews: [],
    loans: []
  },
  {
    id: "b5",
    title: "Breve historia del tiempo",
    authorId: "a3",
    categoryId: "c3",
    isbn: "978-8439702580",
    pages: 256,
    year: 1988,
    summary: "Stephen Hawking explica los grandes misterios del universo, el Big Bang, los agujeros negros y la física moderna, de forma accesible para el público general.",
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    reviews: [
      { id: "r6", user: "Jorge H.", rating: 5, comment: "Revelador y fascinante. Consigue hacer simple lo extremadamente complejo." }
    ],
    loans: [
      { id: "l5", user: "Paula Díaz", startDate: "2026-02-01", endDate: "2026-02-15", status: "returned" }
    ]
  }
];

export const initialAuthors = [
  {
    id: "a1",
    name: "Gabriel García Márquez",
    bio: "Escritor y periodista colombiano, galardonado con el Premio Nobel de Literatura en 1982. Es la figura cumbre del realismo mágico y uno de los autores en español más influyentes de la historia.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
  },
  {
    id: "a2",
    name: "Dan Brown",
    bio: "Escritor estadounidense conocido por sus novelas de suspenso y teorías conspirativas, protagonizadas en su mayoría por el icónico personaje Robert Langdon.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
  },
  {
    id: "a3",
    name: "Stephen Hawking",
    bio: "Físico teórico, astrofísico, cosmólogo y divulgador científico británico, conocido por sus investigaciones sobre los agujeros negros y sus libros de divulgación estelar.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
  }
];

export const initialCategories = [
  { id: "c1", name: "Ficción & Novela", description: "Narrativas literarias, novelas cortas y clásicos de la literatura universal." },
  { id: "c2", name: "Suspenso & Thriller", description: "Historias intrigantes llenas de misterio, conspiraciones y acción continua." },
  { id: "c3", name: "Ciencia & Divulgación", description: "Ensayos científicos, física teórica, cosmología y explicaciones del universo." }
];

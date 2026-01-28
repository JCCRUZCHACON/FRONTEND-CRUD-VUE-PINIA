import { defineStore } from 'pinia'
import api from '../api/studentsApi'
import type { Student } from '../types/student'

export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [] as Student[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    // GET
    async getStudents() {
      this.loading = true
      try {
        const res = await api.get<Student[]>('/')
        this.students = res.data
      } catch {
        this.error = 'Error al obtener estudiantes'
      } finally {
        this.loading = false
      }
    },

    // CREATE
    async createStudent(data: Student) {
      try {
        const res = await api.post<Student>('/', data)
        this.students.push(res.data)
      } catch {
        this.error = 'Error al crear estudiante'
      }
    },

    // DELETE
    async deleteStudent(id: number) {
      try {
        await api.delete(`/${id}`)
        this.students = this.students.filter(
          (student) => student.id !== id
        )
      } catch {
        this.error = 'Error al eliminar estudiante'
      }
    },

    // UPDATE 🔥
    async updateStudent(id: number, data: Partial<Student>) {
      try {
        const res = await api.patch<Student>(`/${id}`, data)

        this.students = this.students.map((student) => 
          student.id === res.data.id
            ? { ...student, ...res.data }
            : student
        )
      } catch {
        this.error = 'Error al actualizar estudiante'
      }
    }
  }
})

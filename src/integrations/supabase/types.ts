export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: {
          id: string
          make: string
          model: string
          year: number
          price: number
          mileage: number
          transmission: string
          fuel_type: string
          images: string[]
          description: string
          features: string[]
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          make: string
          model: string
          year: number
          price: number
          mileage: number
          transmission: string
          fuel_type: string
          images: string[]
          description: string
          features: string[]
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          make?: string
          model?: string
          year?: number
          price?: number
          mileage?: number
          transmission?: string
          fuel_type?: string
          images?: string[]
          description?: string
          features?: string[]
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

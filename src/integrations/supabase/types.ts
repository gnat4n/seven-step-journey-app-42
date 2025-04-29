export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assinaturas: {
        Row: {
          ativo: boolean
          data_cancelamento: string | null
          data_inicio: string | null
          id: string
          tipo_assinatura: string
          user_id: string | null
        }
        Insert: {
          ativo?: boolean
          data_cancelamento?: string | null
          data_inicio?: string | null
          id?: string
          tipo_assinatura: string
          user_id?: string | null
        }
        Update: {
          ativo?: boolean
          data_cancelamento?: string | null
          data_inicio?: string | null
          id?: string
          tipo_assinatura?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assinaturas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios_checkout"
            referencedColumns: ["id"]
          },
        ]
      }
      conquistas: {
        Row: {
          data: string
          id: string
          medalha_id: string
          user_id: string
        }
        Insert: {
          data?: string
          id?: string
          medalha_id: string
          user_id: string
        }
        Update: {
          data?: string
          id?: string
          medalha_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conquistas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      diario: {
        Row: {
          data: string
          fome_emocional: boolean | null
          id: string
          nivel_fome: number | null
          nota_dia: string | null
          sentimento: string | null
          user_id: string
        }
        Insert: {
          data?: string
          fome_emocional?: boolean | null
          id?: string
          nivel_fome?: number | null
          nota_dia?: string | null
          sentimento?: string | null
          user_id: string
        }
        Update: {
          data?: string
          fome_emocional?: boolean | null
          id?: string
          nivel_fome?: number | null
          nota_dia?: string | null
          sentimento?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diario_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      lista_compras: {
        Row: {
          categoria: string
          checked: boolean | null
          created_at: string | null
          id: string
          item: string
          user_id: string
        }
        Insert: {
          categoria: string
          checked?: boolean | null
          created_at?: string | null
          id?: string
          item: string
          user_id: string
        }
        Update: {
          categoria?: string
          checked?: boolean | null
          created_at?: string | null
          id?: string
          item?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lista_compras_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      orderbumps_comprados: {
        Row: {
          data: string | null
          id: string
          nome_produto: string
          user_id: string | null
          valor: number
        }
        Insert: {
          data?: string | null
          id?: string
          nome_produto: string
          user_id?: string | null
          valor: number
        }
        Update: {
          data?: string | null
          id?: string
          nome_produto?: string
          user_id?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "orderbumps_comprados_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios_checkout"
            referencedColumns: ["id"]
          },
        ]
      }
      progresso: {
        Row: {
          data_conclusao: string | null
          data_inicio: string | null
          id: string
          passo_id: number
          status: string
          user_id: string
        }
        Insert: {
          data_conclusao?: string | null
          data_inicio?: string | null
          id?: string
          passo_id: number
          status?: string
          user_id: string
        }
        Update: {
          data_conclusao?: string | null
          data_inicio?: string | null
          id?: string
          passo_id?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "progresso_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      receitas: {
        Row: {
          beneficios: string
          created_at: string | null
          id: string
          imagem_url: string | null
          modo_preparo: string
          passo_minimo: number
          tempo_preparo: string
          titulo: string
        }
        Insert: {
          beneficios: string
          created_at?: string | null
          id?: string
          imagem_url?: string | null
          modo_preparo: string
          passo_minimo?: number
          tempo_preparo: string
          titulo: string
        }
        Update: {
          beneficios?: string
          created_at?: string | null
          id?: string
          imagem_url?: string | null
          modo_preparo?: string
          passo_minimo?: number
          tempo_preparo?: string
          titulo?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          admin: boolean
          avatar_status: number
          created_at: string
          email: string
          id: string
          last_login: string | null
          nivel_atual: number
          xp_total: number
        }
        Insert: {
          admin?: boolean
          avatar_status?: number
          created_at?: string
          email: string
          id: string
          last_login?: string | null
          nivel_atual?: number
          xp_total?: number
        }
        Update: {
          admin?: boolean
          avatar_status?: number
          created_at?: string
          email?: string
          id?: string
          last_login?: string | null
          nivel_atual?: number
          xp_total?: number
        }
        Relationships: []
      }
      usuarios_checkout: {
        Row: {
          data_compra: string | null
          email: string
          forma_pagamento: string
          id: string
          nome: string
          status_pagamento: string
          total_pago: number
        }
        Insert: {
          data_compra?: string | null
          email: string
          forma_pagamento: string
          id?: string
          nome: string
          status_pagamento?: string
          total_pago: number
        }
        Update: {
          data_compra?: string | null
          email?: string
          forma_pagamento?: string
          id?: string
          nome?: string
          status_pagamento?: string
          total_pago?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      match_documents: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

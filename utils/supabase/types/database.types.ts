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
			bookmarks: {
				Row: {
					created_at: string
					id: number
					scenario_id: number
					user_id: string
				}
				Insert: {
					created_at?: string
					id?: number
					scenario_id: number
					user_id?: string
				}
				Update: {
					created_at?: string
					id?: number
					scenario_id?: number
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "public_bookmarks_scenario_id_fkey"
						columns: ["scenario_id"]
						isOneToOne: false
						referencedRelation: "scenarios"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "public_bookmarks_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			profiles: {
				Row: {
					admin: boolean
					bio: string | null
					created_at: string
					email: string
					id: number
					image: string | null
					links: string[] | null
					name: string | null
					user_id: string
				}
				Insert: {
					admin?: boolean
					bio?: string | null
					created_at?: string
					email: string
					id?: number
					image?: string | null
					links?: string[] | null
					name?: string | null
					user_id?: string
				}
				Update: {
					admin?: boolean
					bio?: string | null
					created_at?: string
					email?: string
					id?: number
					image?: string | null
					links?: string[] | null
					name?: string | null
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "public_profiles_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			scenarios: {
				Row: {
					choices: string[] | null
					created_at: string
					finished: boolean | null
					follow_count: number
					id: number
					prompt: string | null
					published: boolean | null
					story: string | null
					title: string
					user_id: string
				}
				Insert: {
					choices?: string[] | null
					created_at?: string
					finished?: boolean | null
					follow_count?: number
					id?: number
					prompt?: string | null
					published?: boolean | null
					story?: string | null
					title?: string
					user_id?: string
				}
				Update: {
					choices?: string[] | null
					created_at?: string
					finished?: boolean | null
					follow_count?: number
					id?: number
					prompt?: string | null
					published?: boolean | null
					story?: string | null
					title?: string
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "public_scenarios_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
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
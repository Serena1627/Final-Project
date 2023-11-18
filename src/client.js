import { createClient } from '@supabase/supabase-js'


const URL = 'https://qbesnncurdkonmnppgxe.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZXNubmN1cmRrb25tbnBwZ3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4OTYzMzIsImV4cCI6MjAxNDQ3MjMzMn0.0twpRVBJwNW1t9iW90o_VG1r9t-qsxNkvz6u7d7nQRY';
export const supabase = createClient(URL, API_KEY);
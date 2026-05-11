import { PersonaShell } from '../components/shell/PersonaShell'
import { TEACHER_CONTENT, TEACHER_SECTIONS } from '../data/content'

export default function Teacher() {
  return <PersonaShell persona="teacher" content={TEACHER_CONTENT} sections={TEACHER_SECTIONS}/>
}

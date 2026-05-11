import { PersonaShell } from '../components/shell/PersonaShell'
import { STUDENT_CONTENT, STUDENT_SECTIONS } from '../data/content'

export default function Student() {
  return <PersonaShell persona="student" content={STUDENT_CONTENT} sections={STUDENT_SECTIONS}/>
}

import { Applicant, AppealItemDto } from '@/shared/api/appeals/types'

export function formatApplicant (applicant: Applicant): string {
  const { last_name, first_name, patronymic_name } = applicant
  return [last_name, first_name, patronymic_name].filter(Boolean).join(' ')
}

export function formatAddress (appeal: AppealItemDto): string {
  const parts = []

  if (appeal.premise?.full_address) {
    parts.push(appeal.premise.full_address)
  }
  if (appeal.apartment?.number) {
    parts.push(`кв. ${appeal.apartment.number}`)
  }

  return parts.length ? parts.join(', ') : 'Адрес не указан'
}

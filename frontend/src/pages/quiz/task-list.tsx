import { FC, PropsWithChildren } from 'react'

import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../../components/Layout'
import NestedAccordion from '../../components/NestedAccordion'
import { Task } from '../../components/TaskCard'
// import TaskCard from '../../components/TaskCard'

const TaskListPrint: FC = () => {

  const { t } = useTranslation('quiz/task-list')
  const resourcesTitle = t('section.resources.title')

  const section1Tasks: Task[] = t('section-1.tasks', { returnObjects: true })
  const section2Tasks: Task[] = t('section-2.tasks', { returnObjects: true })
  const section3Tasks: Task[] = t('section-3.tasks', { returnObjects: true })
  const filterIds = new Set(['1', '3', '20', '30', '100'])

  const section1FilteredTasks = section1Tasks.filter(task => filterIds.has(task.id))
  const section2FilteredTasks = section2Tasks.filter(task => filterIds.has(task.id))
  const section3FilteredTasks = section3Tasks.filter(task => filterIds.has(task.id))

  return (
    <Layout>
      <NestedAccordion sectionTitle={t('section-1.title')} tasks={section1FilteredTasks} />
      <NestedAccordion sectionTitle={t('section-2.title')} tasks={section2FilteredTasks} />
      <NestedAccordion sectionTitle={t('section-3.title')} tasks={section2FilteredTasks} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'default', [
      'common',
      'quiz/task-list'
    ])),
  },
})

export default TaskListPrint

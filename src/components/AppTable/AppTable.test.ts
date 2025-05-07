import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppTable from './AppTable.vue';

vi.mock('@/types/Sorting', () => ({
  SortingOrder: { asc: 'asc', desc: 'desc' },
}));

describe('AppTable', () => {
  const header = [
    { key: 'col1', value: 'Column 1', sort: true },
    { key: 'col2', value: 'Column 2', sort: false },
  ];
  const data = [
    { key: 'row1', value: 'Row 1', data: { id: 1 } },
    { key: 'row2', value: 'Row 2', data: { id: 2 } },
  ];

  it('renders table headers and rows', () => {
    const wrapper = mount(AppTable, {
      props: { header, data },
    });
    const headers = wrapper.findAll('.app-table__header-cell');

    expect(headers.length).toBe(2);
    expect(headers[0].text()).toContain('Column 1');
    expect(headers[1].text()).toContain('Column 2');

    const rows = wrapper.findAll('.app-table__data');

    expect(rows.length).toBe(2);
    expect(rows[0].text()).toContain('Row 1');
    expect(rows[1].text()).toContain('Row 2');
  });

  it('renders sort icon only for sortable columns', () => {
    const wrapper = mount(AppTable, {
      props: { header, data },
    });

    const icons = wrapper.findAll('.app-table__header-icon');
    expect(icons.length).toBe(1);
  });

  it('emits on-sort with correct order when sortable header is clicked', async () => {
    const wrapper = mount(AppTable, {
      props: { header, data, activeSortingOrder: 'asc' },
    });
    const headers = wrapper.findAll('.app-table__header-cell');
    await headers[0].trigger('click');

    expect(wrapper.emitted('on-sort')).toBeTruthy();
    expect(wrapper.emitted('on-sort')?.[0]).toEqual(['desc']);
  });

  it('does not emit on-sort when non-sortable header is clicked', async () => {
    const wrapper = mount(AppTable, {
      props: { header, data },
    });

    const headers = wrapper.findAll('.app-table__header-cell');
    await headers[1].trigger('click');
    expect(wrapper.emitted('on-sort')).toBeFalsy();
  });

  it('emits on-row-click with row data when row is clicked', async () => {
    const wrapper = mount(AppTable, {
      props: { header, data },
    });

    const rows = wrapper.findAll('.app-table__data');
    await rows[1].trigger('click');

    expect(wrapper.emitted('on-row-click')).toBeTruthy();
    expect(wrapper.emitted('on-row-click')?.[0][0]).toEqual(data[1]);
  });

  it('applies active class to row and sort icon when appropriate', () => {
    const wrapper = mount(AppTable, {
      props: {
        header,
        data,
        activeSortingOrder: 'desc',
        activeRowKey: 'row2',
      },
    });

    expect(wrapper.find('.app-table__header-icon--is-active').exists()).toBe(true);
    const activeRow = wrapper.findAll('.app-table__data-cell--is-active');
    expect(activeRow.length).toBe(1);
    expect(activeRow[0].text()).toBe('Row 2');
  });
});

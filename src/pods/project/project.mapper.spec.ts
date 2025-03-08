import {mapProjectFromApiToVm} from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';


describe('mapProjectFromApiToVm', () => {
  it('should be equal the result expected when the values are correct', () => {
    const project:apiModel.Project = {
      id: '1',
      name: 'Proyecto 1',
      isActive: true,
      employees:[{
        id: '1',
        employeeName: 'Empleado1 '
      }],
    }
    
    const expectedProject:viewModel.Project = {
      id: '1',
      name: 'Proyecto 1',
      isActive: true,
      employees:[{
        id: '1',
        employeeName: 'Empleado1 '
      }],
    }

    const result = mapProjectFromApiToVm(project)

    expect(result ).toEqual(expectedProject)

  })
});
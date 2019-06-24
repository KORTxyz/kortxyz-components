import { Component ,h } from '@stencil/core';

@Component({
  tag: 'kortxyz-sidebar',
  styleUrl: 'kortxyz-sidebar.css'
})

export class kortxyzSidebar {
  render() {
    return <slot />;
	}
	
}